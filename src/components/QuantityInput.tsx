import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFavorites } from "@/hooks/useFavorites";

interface QuantityInputProps {
  instanceId: string;
  paymentRate: number;
  paymentUnit: string;
}

export const QuantityInput = ({ instanceId, paymentRate, paymentUnit }: QuantityInputProps) => {
  const { favorites, updateQuantities } = useFavorites();
  const favorite = favorites.find(f => f.instanceId === instanceId);
  const [meters, setMeters] = useState(favorite?.customQuantities?.meters || 0);

  useEffect(() => {
    if (meters > 0) {
      updateQuantities(instanceId, { meters });
    }
  }, [meters, instanceId]);

  const calculatedTotal = paymentRate * meters;

  return (
    <div className="space-y-2 p-3 bg-muted/50 rounded-md">
      <Label htmlFor={`meters-${instanceId}`} className="text-sm font-medium">
        Length (meters)
      </Label>
      <Input
        id={`meters-${instanceId}`}
        type="number"
        min="0"
        step="1"
        value={meters || ""}
        onChange={(e) => setMeters(Number(e.target.value))}
        placeholder="Enter meters"
        className="w-full"
      />
      <div className="text-sm space-y-1">
        <p className="text-muted-foreground">
          Rate: €{paymentRate.toFixed(2)} per {paymentUnit}
        </p>
        {meters > 0 && (
          <p className="font-semibold text-foreground">
            Estimated: €{calculatedTotal.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
};
