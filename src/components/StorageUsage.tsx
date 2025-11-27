import { useState, useEffect } from 'react';
import { HardDrive } from 'lucide-react';
import { getStorageUsage, isNativeApp } from '@/services/videoDownloader';
import { Progress } from '@/components/ui/progress';

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const StorageUsage = () => {
  const [usage, setUsage] = useState({ videos: 0, images: 0, total: 0 });

  useEffect(() => {
    const loadUsage = async () => {
      if (isNativeApp()) {
        const data = await getStorageUsage();
        setUsage(data);
      }
    };
    loadUsage();
  }, []);

  if (!isNativeApp() || usage.total === 0) {
    return null;
  }

  // Assume 500MB max for visual representation
  const maxStorage = 500 * 1024 * 1024;
  const percentage = Math.min((usage.total / maxStorage) * 100, 100);

  return (
    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <HardDrive className="h-4 w-4" />
        <span>Offline Storage</span>
      </div>
      <Progress value={percentage} className="h-2" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatBytes(usage.total)} used</span>
        <div className="flex gap-3">
          <span>Videos: {formatBytes(usage.videos)}</span>
          <span>Images: {formatBytes(usage.images)}</span>
        </div>
      </div>
    </div>
  );
};
