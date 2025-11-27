import { useNetwork } from '@/hooks/useNetwork';
import { WifiOff, Wifi, CloudOff, Cloud } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const OfflineIndicator = () => {
  const { isOnline, isWifi, connectionType } = useNetwork();

  if (isOnline && isWifi) {
    return null; // Don't show anything when on WiFi
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      {!isOnline ? (
        <Badge variant="destructive" className="flex items-center gap-1.5 px-3 py-1.5">
          <WifiOff className="h-3.5 w-3.5" />
          <span>Offline</span>
        </Badge>
      ) : (
        <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5">
          <Cloud className="h-3.5 w-3.5" />
          <span>Mobile Data</span>
        </Badge>
      )}
    </div>
  );
};

export const OfflineBadge = ({ isDownloaded }: { isDownloaded: boolean }) => {
  if (!isDownloaded) return null;

  return (
    <Badge 
      variant="outline" 
      className="absolute top-2 left-2 bg-green-500/90 text-white border-none text-xs"
    >
      <CloudOff className="h-3 w-3 mr-1" />
      Available Offline
    </Badge>
  );
};
