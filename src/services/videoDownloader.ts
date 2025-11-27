import { Filesystem, Directory, WriteFileResult } from '@capacitor/filesystem';
import { 
  updateCachedAction, 
  addToDownloadQueue, 
  updateDownloadQueueItem, 
  removeFromDownloadQueue,
  getCachedEcoActions
} from './offlineStorage';

const VIDEO_FOLDER = 'action_videos';
const IMAGE_FOLDER = 'action_images';

// Check if we're running in a native Capacitor environment
export const isNativeApp = (): boolean => {
  return typeof (window as any).Capacitor !== 'undefined' && 
         (window as any).Capacitor.isNativePlatform?.();
};

// Initialize folders
export const initializeStorage = async (): Promise<void> => {
  if (!isNativeApp()) return;
  
  try {
    await Filesystem.mkdir({
      path: VIDEO_FOLDER,
      directory: Directory.Data,
      recursive: true
    });
    await Filesystem.mkdir({
      path: IMAGE_FOLDER,
      directory: Directory.Data,
      recursive: true
    });
  } catch (error) {
    // Folders might already exist
    console.log('Storage folders initialized or already exist');
  }
};

// Download a video for offline use
export const downloadVideo = async (
  actionId: string,
  videoUrl: string,
  onProgress?: (progress: number) => void
): Promise<string | null> => {
  if (!isNativeApp()) {
    console.warn('Video download only available in native app');
    return null;
  }

  const fileName = `${actionId}_video.mp4`;
  const filePath = `${VIDEO_FOLDER}/${fileName}`;

  try {
    await addToDownloadQueue({ actionId, type: 'video', url: videoUrl });
    await updateDownloadQueueItem(actionId, 'video', { status: 'downloading' });

    // Fetch the video
    const response = await fetch(videoUrl);
    if (!response.ok) throw new Error('Failed to fetch video');

    const blob = await response.blob();
    const base64Data = await blobToBase64(blob);

    // Write to filesystem
    await Filesystem.writeFile({
      path: filePath,
      data: base64Data,
      directory: Directory.Data
    });

    // Update cache
    await updateCachedAction(actionId, {
      video_downloaded: true,
      video_local_path: filePath
    });

    await updateDownloadQueueItem(actionId, 'video', { status: 'completed', progress: 100 });
    await removeFromDownloadQueue(actionId, 'video');

    return filePath;
  } catch (error) {
    console.error('Error downloading video:', error);
    await updateDownloadQueueItem(actionId, 'video', { status: 'failed' });
    return null;
  }
};

// Download an image for offline use
export const downloadImage = async (
  actionId: string,
  imageUrl: string
): Promise<string | null> => {
  if (!isNativeApp()) return null;

  const extension = imageUrl.split('.').pop()?.split('?')[0] || 'jpg';
  const fileName = `${actionId}_image.${extension}`;
  const filePath = `${IMAGE_FOLDER}/${fileName}`;

  try {
    await addToDownloadQueue({ actionId, type: 'image', url: imageUrl });
    await updateDownloadQueueItem(actionId, 'image', { status: 'downloading' });

    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Failed to fetch image');

    const blob = await response.blob();
    const base64Data = await blobToBase64(blob);

    await Filesystem.writeFile({
      path: filePath,
      data: base64Data,
      directory: Directory.Data
    });

    await updateCachedAction(actionId, {
      image_downloaded: true,
      image_local_path: filePath
    });

    await updateDownloadQueueItem(actionId, 'image', { status: 'completed', progress: 100 });
    await removeFromDownloadQueue(actionId, 'image');

    return filePath;
  } catch (error) {
    console.error('Error downloading image:', error);
    await updateDownloadQueueItem(actionId, 'image', { status: 'failed' });
    return null;
  }
};

// Get local file URI for playback
export const getLocalFileUri = async (filePath: string): Promise<string | null> => {
  if (!isNativeApp()) return null;

  try {
    const result = await Filesystem.getUri({
      path: filePath,
      directory: Directory.Data
    });
    return result.uri;
  } catch (error) {
    console.error('Error getting file URI:', error);
    return null;
  }
};

// Read local file as base64
export const readLocalFile = async (filePath: string): Promise<string | null> => {
  if (!isNativeApp()) return null;

  try {
    const result = await Filesystem.readFile({
      path: filePath,
      directory: Directory.Data
    });
    return result.data as string;
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
};

// Delete a downloaded file
export const deleteDownloadedFile = async (filePath: string): Promise<boolean> => {
  if (!isNativeApp()) return false;

  try {
    await Filesystem.deleteFile({
      path: filePath,
      directory: Directory.Data
    });
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

// Delete all downloaded content for an action
export const deleteActionDownloads = async (actionId: string): Promise<void> => {
  const actions = await getCachedEcoActions();
  const action = actions.find(a => a.id === actionId);
  
  if (action) {
    if (action.video_local_path) {
      await deleteDownloadedFile(action.video_local_path);
    }
    if (action.image_local_path) {
      await deleteDownloadedFile(action.image_local_path);
    }
    await updateCachedAction(actionId, {
      video_downloaded: false,
      video_local_path: null,
      image_downloaded: false,
      image_local_path: null
    });
  }
};

// Get storage usage
export const getStorageUsage = async (): Promise<{ videos: number; images: number; total: number }> => {
  if (!isNativeApp()) return { videos: 0, images: 0, total: 0 };

  let videosSize = 0;
  let imagesSize = 0;

  try {
    const videoFiles = await Filesystem.readdir({
      path: VIDEO_FOLDER,
      directory: Directory.Data
    });
    
    for (const file of videoFiles.files) {
      const stat = await Filesystem.stat({
        path: `${VIDEO_FOLDER}/${file.name}`,
        directory: Directory.Data
      });
      videosSize += stat.size || 0;
    }
  } catch (error) {
    // Folder might not exist yet
  }

  try {
    const imageFiles = await Filesystem.readdir({
      path: IMAGE_FOLDER,
      directory: Directory.Data
    });
    
    for (const file of imageFiles.files) {
      const stat = await Filesystem.stat({
        path: `${IMAGE_FOLDER}/${file.name}`,
        directory: Directory.Data
      });
      imagesSize += stat.size || 0;
    }
  } catch (error) {
    // Folder might not exist yet
  }

  return {
    videos: videosSize,
    images: imagesSize,
    total: videosSize + imagesSize
  };
};

// Helper: Convert Blob to Base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      // Remove the data URL prefix (e.g., "data:video/mp4;base64,")
      const base64Data = base64.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
