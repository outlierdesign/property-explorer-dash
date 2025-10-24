import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ActionItem {
  title: string;
  category: string | null;
  description: string | null;
  paymentRate: number | null;
  paymentUnit: string | null;
  calculatedTotal: number;
  customQuantities?: {
    meters?: number;
    wallType?: string;
  };
}

interface EmailRequest {
  senderEmail: string;
  recipientEmail: string;
  message?: string;
  favorites: ActionItem[];
  totalEstimate: number;
}

const generateEmailHTML = (data: EmailRequest) => {
  const actionsHTML = data.favorites.map((action, index) => `
    <div style="margin-bottom: 20px; padding: 15px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #10b981;">
      <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px;">
        ${index + 1}. ${action.title}
      </h3>
      ${action.category ? `
        <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px;">
          <strong>Category:</strong> ${action.category}
        </p>
      ` : ''}
      ${action.description ? `
        <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 14px;">
          ${action.description}
        </p>
      ` : ''}
      ${action.paymentRate && action.paymentUnit ? `
        <p style="margin: 0 0 4px 0; color: #374151; font-size: 14px;">
          <strong>Payment Rate:</strong> €${action.paymentRate.toFixed(2)} per ${action.paymentUnit}
        </p>
      ` : ''}
      ${action.customQuantities?.meters ? `
        <p style="margin: 0 0 4px 0; color: #374151; font-size: 14px;">
          <strong>Length:</strong> ${action.customQuantities.meters} meters
        </p>
      ` : ''}
      <p style="margin: 8px 0 0 0; color: #059669; font-size: 16px; font-weight: bold;">
        Estimated Payment: €${action.calculatedTotal.toFixed(2)}
      </p>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your ACRES Action Plan</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Your ACRES Action Plan</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
          Personalized Environmental Action Recommendations
        </p>
      </div>
      
      <div style="background-color: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
        ${data.message ? `
          <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; margin-bottom: 25px; border-radius: 4px;">
            <p style="margin: 0; color: #065f46; font-style: italic;">
              "${data.message}"
            </p>
            <p style="margin: 8px 0 0 0; color: #059669; font-size: 14px;">
              - From ${data.senderEmail}
            </p>
          </div>
        ` : ''}
        
        <div style="margin-bottom: 25px;">
          <h2 style="color: #1f2937; font-size: 20px; margin-bottom: 15px;">Summary</h2>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px;">
            <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 16px;">
              <strong>Actions Selected:</strong> ${data.favorites.length}
            </p>
            <p style="margin: 0; color: #059669; font-size: 20px; font-weight: bold;">
              Total Estimated Payment: €${data.totalEstimate.toFixed(2)}
            </p>
          </div>
        </div>

        <h2 style="color: #1f2937; font-size: 20px; margin-bottom: 15px;">Selected Actions</h2>
        ${actionsHTML}

        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
          <h3 style="color: #1f2937; font-size: 18px; margin-bottom: 10px;">Important Notes</h3>
          <ul style="color: #6b7280; font-size: 14px; line-height: 1.8;">
            <li>Payments are subject to inspection and verification</li>
            <li>This is an estimate only and not a guarantee</li>
            <li>Typical commitment period is 5 years</li>
            <li>For official details and application, visit the ACRES website</li>
          </ul>
        </div>
      </div>

      <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
        <p style="margin: 0; color: #6b7280; font-size: 12px;">
          This email was generated from the ACRES Action Explorer
        </p>
        <p style="margin: 8px 0 0 0; color: #9ca3af; font-size: 11px;">
          Generated on ${new Date().toLocaleDateString('en-IE', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: EmailRequest = await req.json();

    console.log("Sending action plan email:", {
      from: data.senderEmail,
      to: data.recipientEmail,
      actionsCount: data.favorites.length,
      total: data.totalEstimate
    });

    const emailResponse = await resend.emails.send({
      from: "ACRES Action Explorer <onboarding@resend.dev>",
      to: [data.recipientEmail],
      reply_to: data.senderEmail,
      subject: `Your ACRES Action Plan - ${data.favorites.length} Actions (€${data.totalEstimate.toFixed(2)} estimated)`,
      html: generateEmailHTML(data),
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-action-plan function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
