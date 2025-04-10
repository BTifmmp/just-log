import { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import React, { createContext, useContext, ReactNode } from 'react';

// Context for the DB instance
const DbContext = createContext<any>(null);

// Custom hook to access the database context
export const useDb = () => useContext(DbContext);

interface DbProviderProps {
  db: ExpoSQLiteDatabase; // Accepts an already opened DB instance
  children: ReactNode;
}

export function DbProvider({ db, children }: DbProviderProps) {
  return (
    <DbContext.Provider value={{ db }}>
      {children}
    </DbContext.Provider>
  );
};