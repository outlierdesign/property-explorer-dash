import { useNetwork } from '@/hooks/useNetwork';
import { WifiOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const OfflineIndicator = () => {
  const { isOnline } = useNetwork();

  if (isOnline) {
    return null; // Don't show anything when online
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      <Badge variant="destructive" className="flex items-center gap-1.5 px-3 py-1.5">
        <WifiOff className="h-3.5 w-3.5" />
        <span>Offline Mode</span>
      </Badge>
    </div>
  );
};
