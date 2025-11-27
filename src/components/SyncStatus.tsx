import { RefreshCw, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

interface SyncStatusProps {
  lastSync: string | null;
  isSyncing: boolean;
  isOnline: boolean;
  onSync: () => void;
}

export const SyncStatus = ({ lastSync, isSyncing, isOnline, onSync }: SyncStatusProps) => {
  const formatLastSync = () => {
    if (!lastSync) return 'Never synced';
    return `Last synced ${formatDistanceToNow(new Date(lastSync), { addSuffix: true })}`;
  };

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {isSyncing ? (
        <RefreshCw className="h-4 w-4 animate-spin" />
      ) : isOnline ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <AlertCircle className="h-4 w-4 text-yellow-500" />
      )}
      <span>{isSyncing ? 'Syncing...' : formatLastSync()}</span>
      {isOnline && !isSyncing && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onSync}
          className="h-6 px-2"
        >
          <RefreshCw className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};
