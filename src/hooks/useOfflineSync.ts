import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  cacheEcoActions, 
  getCachedEcoActions, 
  getLastSyncTime,
  CachedEcoAction 
} from '@/services/offlineStorage';
import { useNetwork } from './useNetwork';
import { isNativeApp, initializeStorage } from '@/services/videoDownloader';

export const useOfflineSync = (streamType?: 'NPI' | 'LA') => {
  const [actions, setActions] = useState<CachedEcoAction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isOnline, isWifi } = useNetwork();

  // Load cached data on mount
  useEffect(() => {
    const loadCached = async () => {
      if (isNativeApp()) {
        await initializeStorage();
      }
      const cached = await getCachedEcoActions();
      const syncTime = await getLastSyncTime();
      
      if (cached.length > 0) {
        const filtered = streamType 
          ? cached.filter(a => a.type === streamType)
          : cached;
        setActions(filtered);
        setLastSync(syncTime);
      }
      setIsLoading(false);
    };
    
    loadCached();
  }, [streamType]);

  // Sync with server
  const syncActions = useCallback(async () => {
    if (!isOnline) {
      setError('No internet connection');
      return false;
    }

    setIsSyncing(true);
    setError(null);

    try {
      let query = supabase.from('eco_actions').select('*');
      
      if (streamType) {
        query = query.eq('type', streamType);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      if (data) {
        // Get existing cached data to preserve download status
        const existingCache = await getCachedEcoActions();
        
        const cachedActions: CachedEcoAction[] = data.map(action => {
          const existing = existingCache.find(e => e.id === action.id);
          return {
            id: action.id,
            title: action.title,
            slug: action.slug,
            description: action.description,
            category: action.category,
            payment_rate: action.payment_rate,
            payment_unit: action.payment_unit,
            image_url: action.image_url,
            video_url: action.video_url,
            video_url_download: action.video_url_download,
            detail_url: action.detail_url,
            type: action.type,
            cached_at: new Date().toISOString(),
            video_downloaded: existing?.video_downloaded || false,
            video_local_path: existing?.video_local_path || null,
            image_downloaded: existing?.image_downloaded || false,
            image_local_path: existing?.image_local_path || null
          };
        });

        await cacheEcoActions(cachedActions);
        setActions(cachedActions);
        setLastSync(new Date().toISOString());
      }

      return true;
    } catch (err) {
      console.error('Sync error:', err);
      setError('Failed to sync data');
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [isOnline, streamType]);

  // Auto-sync when coming online or on WiFi
  useEffect(() => {
    if (isOnline && actions.length === 0) {
      syncActions();
    }
  }, [isOnline, actions.length, syncActions]);

  // Auto-sync on WiFi if it's been a while
  useEffect(() => {
    if (isWifi && lastSync) {
      const lastSyncDate = new Date(lastSync);
      const hoursSinceSync = (Date.now() - lastSyncDate.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceSync > 24) {
        syncActions();
      }
    }
  }, [isWifi, lastSync, syncActions]);

  return {
    actions,
    isLoading,
    isSyncing,
    lastSync,
    error,
    isOnline,
    isWifi,
    syncActions,
    refreshActions: syncActions
  };
};
