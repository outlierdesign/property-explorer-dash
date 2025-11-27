import { useState, useEffect, useCallback } from 'react';
import { Network, ConnectionStatus, ConnectionType } from '@capacitor/network';
import { isNativeApp } from '@/services/videoDownloader';

export interface NetworkState {
  isOnline: boolean;
  isWifi: boolean;
  connectionType: ConnectionType | 'unknown';
}

export const useNetwork = () => {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isOnline: navigator.onLine,
    isWifi: false,
    connectionType: 'unknown'
  });

  const updateNetworkState = useCallback((status: ConnectionStatus) => {
    setNetworkState({
      isOnline: status.connected,
      isWifi: status.connectionType === 'wifi',
      connectionType: status.connectionType
    });
  }, []);

  useEffect(() => {
    // Get initial status
    const getInitialStatus = async () => {
      if (isNativeApp()) {
        const status = await Network.getStatus();
        updateNetworkState(status);
      } else {
        // Web fallback
        setNetworkState(prev => ({
          ...prev,
          isOnline: navigator.onLine
        }));
      }
    };

    getInitialStatus();

    // Listen for changes
    let listener: any;
    
    if (isNativeApp()) {
      Network.addListener('networkStatusChange', updateNetworkState).then(l => {
        listener = l;
      });
    } else {
      // Web fallback
      const handleOnline = () => setNetworkState(prev => ({ ...prev, isOnline: true }));
      const handleOffline = () => setNetworkState(prev => ({ ...prev, isOnline: false }));
      
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }

    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, [updateNetworkState]);

  return networkState;
};
