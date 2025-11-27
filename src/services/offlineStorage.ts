import { Preferences } from '@capacitor/preferences';

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
  video_downloaded: boolean;
  video_local_path: string | null;
  image_downloaded: boolean;
  image_local_path: string | null;
}

const ACTIONS_CACHE_KEY = 'eco_actions_cache';
const LAST_SYNC_KEY = 'last_sync_timestamp';
const DOWNLOAD_QUEUE_KEY = 'download_queue';

// Store eco actions locally
export const cacheEcoActions = async (actions: CachedEcoAction[]): Promise<void> => {
  await Preferences.set({
    key: ACTIONS_CACHE_KEY,
    value: JSON.stringify(actions)
  });
  await Preferences.set({
    key: LAST_SYNC_KEY,
    value: new Date().toISOString()
  });
};

// Get cached eco actions
export const getCachedEcoActions = async (): Promise<CachedEcoAction[]> => {
  const { value } = await Preferences.get({ key: ACTIONS_CACHE_KEY });
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
};

// Update a single cached action (e.g., after video download)
export const updateCachedAction = async (
  actionId: string,
  updates: Partial<CachedEcoAction>
): Promise<void> => {
  const actions = await getCachedEcoActions();
  const index = actions.findIndex(a => a.id === actionId);
  if (index !== -1) {
    actions[index] = { ...actions[index], ...updates };
    await Preferences.set({
      key: ACTIONS_CACHE_KEY,
      value: JSON.stringify(actions)
    });
  }
};

// Get last sync timestamp
export const getLastSyncTime = async (): Promise<string | null> => {
  const { value } = await Preferences.get({ key: LAST_SYNC_KEY });
  return value;
};

// Download queue management
export interface DownloadQueueItem {
  actionId: string;
  type: 'video' | 'image';
  url: string;
  status: 'pending' | 'downloading' | 'completed' | 'failed';
  progress: number;
  addedAt: string;
}

export const getDownloadQueue = async (): Promise<DownloadQueueItem[]> => {
  const { value } = await Preferences.get({ key: DOWNLOAD_QUEUE_KEY });
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
};

export const addToDownloadQueue = async (item: Omit<DownloadQueueItem, 'status' | 'progress' | 'addedAt'>): Promise<void> => {
  const queue = await getDownloadQueue();
  const exists = queue.find(q => q.actionId === item.actionId && q.type === item.type);
  if (!exists) {
    queue.push({
      ...item,
      status: 'pending',
      progress: 0,
      addedAt: new Date().toISOString()
    });
    await Preferences.set({
      key: DOWNLOAD_QUEUE_KEY,
      value: JSON.stringify(queue)
    });
  }
};

export const updateDownloadQueueItem = async (
  actionId: string,
  type: 'video' | 'image',
  updates: Partial<DownloadQueueItem>
): Promise<void> => {
  const queue = await getDownloadQueue();
  const index = queue.findIndex(q => q.actionId === actionId && q.type === type);
  if (index !== -1) {
    queue[index] = { ...queue[index], ...updates };
    await Preferences.set({
      key: DOWNLOAD_QUEUE_KEY,
      value: JSON.stringify(queue)
    });
  }
};

export const removeFromDownloadQueue = async (actionId: string, type: 'video' | 'image'): Promise<void> => {
  const queue = await getDownloadQueue();
  const filtered = queue.filter(q => !(q.actionId === actionId && q.type === type));
  await Preferences.set({
    key: DOWNLOAD_QUEUE_KEY,
    value: JSON.stringify(filtered)
  });
};

// Clear all cached data
export const clearAllCache = async (): Promise<void> => {
  await Preferences.remove({ key: ACTIONS_CACHE_KEY });
  await Preferences.remove({ key: LAST_SYNC_KEY });
  await Preferences.remove({ key: DOWNLOAD_QUEUE_KEY });
};
