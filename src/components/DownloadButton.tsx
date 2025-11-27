import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Check, Loader2, Trash2, AlertCircle } from 'lucide-react';
import { 
  downloadVideo, 
  downloadImage, 
  deleteActionDownloads,
  isNativeApp 
} from '@/services/videoDownloader';
import { updateCachedAction, getCachedEcoActions } from '@/services/offlineStorage';
import { useToast } from '@/hooks/use-toast';
import { useNetwork } from '@/hooks/useNetwork';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface DownloadButtonProps {
  actionId: string;
  actionTitle: string;
  videoUrl?: string | null;
  imageUrl?: string | null;
  isDownloaded: boolean;
  onDownloadComplete?: () => void;
  compact?: boolean;
}

export const DownloadButton = ({
  actionId,
  actionTitle,
  videoUrl,
  imageUrl,
  isDownloaded,
  onDownloadComplete,
  compact = false
}: DownloadButtonProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const { isOnline, isWifi } = useNetwork();

  if (!isNativeApp()) {
    return null; // Only show in native app
  }

  const handleDownload = async () => {
    if (!videoUrl && !imageUrl) {
      toast({
        title: 'No content to download',
        description: 'This action has no downloadable content.',
        variant: 'destructive'
      });
      return;
    }

    if (!isOnline) {
      toast({
        title: 'No internet connection',
        description: 'Please connect to the internet to download content.',
        variant: 'destructive'
      });
      return;
    }

    if (!isWifi) {
      // Warn about mobile data usage
      toast({
        title: 'Using mobile data',
        description: 'Downloading on mobile data may incur charges.',
      });
    }

    setIsDownloading(true);
    setProgress(0);

    try {
      let videoDownloaded = false;
      let imageDownloaded = false;

      // Download video if available
      if (videoUrl) {
        setProgress(10);
        const videoPath = await downloadVideo(actionId, videoUrl, (p) => setProgress(p * 0.8));
        videoDownloaded = !!videoPath;
      }

      // Download image if available
      if (imageUrl) {
        setProgress(85);
        const imagePath = await downloadImage(actionId, imageUrl);
        imageDownloaded = !!imagePath;
      }

      setProgress(100);

      if (videoDownloaded || imageDownloaded) {
        toast({
          title: 'Download complete',
          description: `"${actionTitle}" is now available offline.`,
        });
        onDownloadComplete?.();
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: 'Download failed',
        description: 'Could not download content. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsDownloading(false);
      setProgress(0);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteActionDownloads(actionId);
      toast({
        title: 'Content removed',
        description: `Offline content for "${actionTitle}" has been deleted.`,
      });
      onDownloadComplete?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not remove downloaded content.',
        variant: 'destructive'
      });
    }
  };

  if (isDownloaded) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="outline" 
            size={compact ? "sm" : "default"}
            className="text-green-600 border-green-600 hover:bg-green-50"
          >
            <Check className="h-4 w-4 mr-1" />
            {!compact && 'Downloaded'}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove offline content?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the downloaded content for "{actionTitle}". You can download it again when online.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Button
      variant="outline"
      size={compact ? "sm" : "default"}
      onClick={handleDownload}
      disabled={isDownloading || !isOnline}
      className="relative overflow-hidden"
    >
      {isDownloading ? (
        <>
          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
          {!compact && `${Math.round(progress)}%`}
          <div 
            className="absolute bottom-0 left-0 h-1 bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </>
      ) : !isOnline ? (
        <>
          <AlertCircle className="h-4 w-4 mr-1" />
          {!compact && 'Offline'}
        </>
      ) : (
        <>
          <Download className="h-4 w-4 mr-1" />
          {!compact && 'Download'}
        </>
      )}
    </Button>
  );
};
