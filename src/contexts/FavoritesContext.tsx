import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface FavoriteAction {
  instanceId: string;
  action: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    category: string | null;
    payment_rate: number | null;
    payment_unit: string | null;
    image_url: string | null;
    video_url: string | null;
    detail_url: string | null;
    type: string;
  };
  addedAt: string;
  customQuantities?: {
    meters?: number;
    wallType?: 'one-sided' | 'two-sided';
  };
  calculatedTotal: number;
}

interface FavoritesContextType {
  favorites: FavoriteAction[];
  addToFavorites: (action: FavoriteAction['action'], quantities?: FavoriteAction['customQuantities']) => void;
  removeFromFavorites: (instanceId: string) => void;
  updateQuantities: (instanceId: string, quantities: FavoriteAction['customQuantities']) => void;
  clearFavorites: () => void;
  getFavorites: () => FavoriteAction[];
  isFavorited: (actionId: string) => boolean;
  getTotalEstimate: () => number;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = "acres-favorites";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteAction[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (action: FavoriteAction['action'], quantities?: FavoriteAction['customQuantities']) => {
    const calculatedTotal = calculateTotal(action, quantities);
    const instanceId = `${action.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    setFavorites(prev => [
      ...prev, 
      {
        instanceId,
        action,
        addedAt: new Date().toISOString(),
        customQuantities: quantities,
        calculatedTotal
      }
    ]);
  };

  const removeFromFavorites = (instanceId: string) => {
    setFavorites(prev => prev.filter(f => f.instanceId !== instanceId));
  };

  const updateQuantities = (instanceId: string, quantities: FavoriteAction['customQuantities']) => {
    setFavorites(prev => prev.map(f => {
      if (f.instanceId === instanceId) {
        const calculatedTotal = calculateTotal(f.action, quantities);
        return { ...f, customQuantities: quantities, calculatedTotal };
      }
      return f;
    }));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const getFavorites = () => favorites;

  const isFavorited = (actionId: string) => {
    return favorites.some(f => f.action.id === actionId);
  };

  const getTotalEstimate = () => {
    return favorites.reduce((sum, f) => sum + f.calculatedTotal, 0);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    updateQuantities,
    clearFavorites,
    getFavorites,
    isFavorited,
    getTotalEstimate,
    count: favorites.length
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

const calculateTotal = (action: FavoriteAction['action'], quantities?: FavoriteAction['customQuantities']): number => {
  const baseRate = action.payment_rate || 0;
  
  if (hasFencingComponent(action) && quantities?.meters) {
    return (baseRate / 100) * quantities.meters;
  }
  
  return baseRate;
};

export const hasFencingComponent = (action: { title: string; description: string | null }): boolean => {
  const searchText = `${action.title} ${action.description || ""}`.toLowerCase();
  return searchText.includes("fencing") || 
         searchText.includes("fence") || 
         searchText.includes("stone wall") ||
         searchText.includes("predator");
};
