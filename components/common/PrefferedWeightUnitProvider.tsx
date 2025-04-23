import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Storage } from 'expo-sqlite/kv-store';

type PreferredWeightUnitContextType = {
  unit: string;
  setUnit: (newUnit: string) => void;
}
const PreferredWeightUnitContext = createContext<PreferredWeightUnitContextType | undefined>(undefined);

const STORAGE_KEY = 'weight_unit';

export const PreferredWeightUnitProvider = ({ children }: { children: ReactNode }) => {
  const [unit, setUnit] = useState('kg'); // default to kg

  useEffect(() => {
    const loadUnit = () => {
      const savedUnit = Storage.getItemSync(STORAGE_KEY);
      if (savedUnit) setUnit(savedUnit);
    };
    loadUnit();
  }, []);

  const updateUnit = (newUnit: string) => {
    Storage.setItemSync(STORAGE_KEY, newUnit);
    setUnit(newUnit);
  };

  return (
    <PreferredWeightUnitContext.Provider value={{ unit, setUnit: updateUnit }}>
      {children}
    </PreferredWeightUnitContext.Provider>
  );
};

export const usePreferredWeightUnit = () => {
  const context = useContext(PreferredWeightUnitContext);

  if (!context) {
    throw new Error('usePrefferedWeightUnit must be used within a PreferredWeightUnitProvider');
  }

  return context;
}
