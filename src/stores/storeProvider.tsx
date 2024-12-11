"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createDataStore, type DataStore } from "./store";

export type StoreApi = ReturnType<typeof createDataStore>;

export interface StoreProviderProps {
  children: ReactNode;
}

export const StoreContext = createContext<StoreApi | undefined>(undefined);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<StoreApi>();
  if (!storeRef.current) storeRef.current = createDataStore();

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useDataStore = <T,>(selector: (store: DataStore) => T): T => {
  const dataStoreContext = useContext(StoreContext);

  if (!dataStoreContext)
    throw new Error("useDataStore must be used within StoreProvider!");

  return useStore(dataStoreContext, selector);
};
