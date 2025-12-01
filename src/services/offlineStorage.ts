// Browser-based offline storage using localStorage and Cache API

export interface CachedEcoAction {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string | null;
  payment_rate: number | null;
  payment_unit: string | null;
  image_url: string | null;
  video_url: string | null;
  video_url_download: string | null;
  detail_url: string | null;
  type: string;
  cached_at: string;
}

const STORAGE_KEY = 'eco_actions_cache';
const SYNC_TIME_KEY = 'last_sync_time';

export const cacheEcoActions = async (actions: CachedEcoAction[]): Promise<void> => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(actions));
    localStorage.setItem(SYNC_TIME_KEY, new Date().toISOString());
  } catch (error) {
    console.error('Failed to cache eco actions:', error);
  }
};

export const getCachedEcoActions = async (): Promise<CachedEcoAction[]> => {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : [];
  } catch (error) {
    console.error('Failed to get cached eco actions:', error);
    return [];
  }
};

export const getLastSyncTime = async (): Promise<string | null> => {
  try {
    return localStorage.getItem(SYNC_TIME_KEY);
  } catch (error) {
    console.error('Failed to get last sync time:', error);
    return null;
  }
};

export const clearCache = async (): Promise<void> => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SYNC_TIME_KEY);
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
};
