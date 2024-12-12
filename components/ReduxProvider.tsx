"use client";
import { Provider } from "react-redux";
import { AppStore, store } from "../lib/store";
import { useRef } from "react";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export const ReduxProvider = ({ children }: ReduxProviderProps) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};
