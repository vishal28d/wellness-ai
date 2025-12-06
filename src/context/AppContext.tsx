import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Profile {
  age: number;
  gender: string;
  goals: string[];
}

export interface WellnessTip {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
}

export interface DetailedTip extends WellnessTip {
  explanation: string;
  steps: string[];
}

interface AppContextType {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  tips: WellnessTip[];
  setTips: (tips: WellnessTip[]) => void;
  selectedTip: WellnessTip | null;
  setSelectedTip: (tip: WellnessTip | null) => void;
  favorites: DetailedTip[];
  addFavorite: (tip: DetailedTip) => void;
  removeFavorite: (tipId: string) => void;
  isFavorite: (tipId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [tips, setTips] = useState<WellnessTip[]>([]);
  const [selectedTip, setSelectedTip] = useState<WellnessTip | null>(null);
  const [favorites, setFavorites] = useState<DetailedTip[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('wellnessFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('wellnessFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (tip: DetailedTip) => {
    if (!favorites.find(f => f.id === tip.id)) {
      setFavorites([...favorites, tip]);
    }
  };

  const removeFavorite = (tipId: string) => {
    setFavorites(favorites.filter(f => f.id !== tipId));
  };

  const isFavorite = (tipId: string) => {
    return favorites.some(f => f.id === tipId);
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        tips,
        setTips,
        selectedTip,
        setSelectedTip,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
