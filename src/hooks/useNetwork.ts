import { useState, useEffect } from 'react';

export interface NetworkState {
  isOnline: boolean;
  isWifi: boolean;
  connectionType: 'wifi' | 'cellular' | 'unknown';
}

export const useNetwork = () => {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isOnline: navigator.onLine,
    isWifi: false,
    connectionType: 'unknown'
  });

  useEffect(() => {
    const updateOnlineStatus = () => {
      // Try to detect connection type via Network Information API
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      
      let connectionType: 'wifi' | 'cellular' | 'unknown' = 'unknown';
      let isWifi = false;

      if (connection) {
        const type = connection.effectiveType || connection.type;
        // Consider 4g and above as potentially wifi, slower as cellular
        if (type === 'wifi' || type === '4g') {
          connectionType = 'wifi';
          isWifi = true;
        } else if (type === 'cellular' || type === '3g' || type === '2g') {
          connectionType = 'cellular';
        }
      }

      setNetworkState({
        isOnline: navigator.onLine,
        isWifi,
        connectionType
      });
    };

    updateOnlineStatus();

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Listen for connection changes if available
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection) {
      connection.addEventListener('change', updateOnlineStatus);
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      if (connection) {
        connection.removeEventListener('change', updateOnlineStatus);
      }
    };
  }, []);

  return networkState;
};
