"use client";
import React, { createContext, useContext, useRef, ReactNode } from "react";

interface AbortControllerContextType {
  abortControllerRef: React.RefObject<AbortController | null>;
  startNewUpload: () => AbortSignal;
  abortUpload: () => void;
}

const AbortControllerContext = createContext<
  AbortControllerContextType | undefined
>(undefined);

export const useAbortControllerContext = () => {
  const context = useContext(AbortControllerContext);
  if (!context) {
    throw new Error(
      "useAbortControllerContext must be used within an AbortControllerProvider"
    );
  }
  return context;
};

// Define 'children' as ReactNode
interface AbortControllerProviderProps {
  children: ReactNode;
}

export const AbortControllerProvider: React.FC<
  AbortControllerProviderProps
> = ({ children }) => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const startNewUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    return abortControllerRef.current.signal;
  };

  const abortUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  return (
    <AbortControllerContext.Provider
      value={{ abortControllerRef, startNewUpload, abortUpload }}
    >
      {children}
    </AbortControllerContext.Provider>
  );
};
