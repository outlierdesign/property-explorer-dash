import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Upload, Video, Check, X, Loader2 } from "lucide-react";
import { StorageUsage } from "@/components/StorageUsage";

interface EcoAction {
  id: string;
  title: string;
  slug: string;
  video_url: string | null;
  video_url_download: string | null;
  type: string;
}

const AdminVideos = () => {
  const [actions, setActions] = useState<EcoAction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchActions();
  }, []);

  const fetchActions = async () => {
    try {
      const { data, error } = await supabase
        .from('eco_actions')
        .select('id, title, slug, video_url, video_url_download, type')
        .order('title');

      if (error) throw error;
      setActions(data || []);
    } catch (error) {
      console.error('Error fetching actions:', error);
      toast({
        title: "Error",
        description: "Failed to load actions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoUpload = async (actionId: string, file: File) => {
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file",
        description: "Please select a video file (MP4, MOV, etc.)",
        variant: "destructive",
      });
      return;
    }

    setUploadingId(actionId);

    try {
      const action = actions.find(a => a.id === actionId);
      if (!action) throw new Error('Action not found');

      const fileExt = file.name.split('.').pop();
      const fileName = `${action.slug}.${fileExt}`;
      const filePath = `videos/${fileName}`;

      // Upload to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('action-videos')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('action-videos')
        .getPublicUrl(filePath);

      // Update the action with the download URL
      const { error: updateError } = await supabase
        .from('eco_actions')
        .update({ video_url_download: urlData.publicUrl })
        .eq('id', actionId);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: `Video uploaded for "${action.title}"`,
      });

      // Refresh the list
      await fetchActions();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Could not upload video",
        variant: "destructive",
      });
    } finally {
      setUploadingId(null);
    }
  };

  const handleRemoveVideo = async (actionId: string) => {
    try {
      const action = actions.find(a => a.id === actionId);
      if (!action?.video_url_download) return;

      // Extract file path from URL
      const urlParts = action.video_url_download.split('/action-videos/');
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        await supabase.storage.from('action-videos').remove([filePath]);
      }

      // Update database
      await supabase
        .from('eco_actions')
        .update({ video_url_download: null })
        .eq('id', actionId);

      toast({
        title: "Video removed",
        description: `Removed video for "${action.title}"`,
      });

      await fetchActions();
    } catch (error) {
      console.error('Remove error:', error);
      toast({
        title: "Error",
        description: "Could not remove video",
        variant: "destructive",
      });
    }
  };

  const actionsWithVimeo = actions.filter(a => a.video_url && !a.video_url_download);
  const actionsWithDownload = actions.filter(a => a.video_url_download);
  const actionsWithoutVideo = actions.filter(a => !a.video_url && !a.video_url_download);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Video Management</h1>
          <p className="text-muted-foreground">
            Upload MP4 videos for offline playback in the native app. Videos should be in MP4 format for best compatibility.
          </p>
        </div>

        <StorageUsage />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Need Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">{actionsWithVimeo.length}</p>
              <p className="text-sm text-muted-foreground">Actions with Vimeo videos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Ready for Offline</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{actionsWithDownload.length}</p>
              <p className="text-sm text-muted-foreground">Actions with downloadable videos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">No Video</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-muted-foreground">{actionsWithoutVideo.length}</p>
              <p className="text-sm text-muted-foreground">Actions without any video</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions needing upload */}
        {actionsWithVimeo.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Actions Needing Video Upload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actionsWithVimeo.map(action => (
                  <div 
                    key={action.id} 
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{action.title}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline">{action.type}</Badge>
                        <Badge variant="secondary">Has Vimeo</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`upload-${action.id}`} className="cursor-pointer">
                        <Button 
                          variant="outline" 
                          asChild
                          disabled={uploadingId === action.id}
                        >
                          <span>
                            {uploadingId === action.id ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Upload className="h-4 w-4 mr-2" />
                            )}
                            Upload MP4
                          </span>
                        </Button>
                      </Label>
                      <Input
                        id={`upload-${action.id}`}
                        type="file"
                        accept="video/mp4,video/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleVideoUpload(action.id, file);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions with downloadable videos */}
        {actionsWithDownload.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Actions Ready for Offline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actionsWithDownload.map(action => (
                  <div 
                    key={action.id} 
                    className="flex items-center justify-between p-4 border rounded-lg border-green-200 bg-green-50/50"
                  >
                    <div>
                      <p className="font-medium">{action.title}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline">{action.type}</Badge>
                        <Badge className="bg-green-100 text-green-800">Offline Ready</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => window.open(action.video_url_download!, '_blank')}
                      >
                        Preview
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleRemoveVideo(action.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminVideos;
