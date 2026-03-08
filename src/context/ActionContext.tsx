"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ActionOverlay, { ActionOverlayColor } from "@/components/ActionOverlay";
import Loader from "@/components/Loader";

type ActionConfig = {
  title: string;
  message: string;
  color?: ActionOverlayColor;
  icon?: string;
};

type ActionContextType = {
  showAction: (config: ActionConfig) => void;
  hideAction: () => void;
  updateAction: (config: Partial<ActionConfig>) => void;
  setGlobalLoading: (loading: boolean) => void;
};

const ActionContext = createContext<ActionContextType | undefined>(undefined);

function SearchParamsHandler({ 
  isReady, 
  setGlobalLoading 
}: { 
  isReady: boolean; 
  setGlobalLoading: (loading: boolean) => void 
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Trigger loader on navigation
  useEffect(() => {
    if (isReady) {
      setGlobalLoading(true);
      const timer = setTimeout(() => {
        setGlobalLoading(false);
      }, 4500); // 4.5 seconds for consistent loading experience
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams, isReady, setGlobalLoading]);

  return null;
}

export function ActionProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [config, setConfig] = useState<ActionConfig>({
    title: "",
    message: "",
    color: "blue",
    icon: "sync",
  });

  useEffect(() => {
    setIsReady(true);
  }, []);

  const showAction = (newConfig: ActionConfig) => {
    setConfig(newConfig);
    setShow(true);
  };

  const hideAction = () => {
    setShow(false);
  };

  const updateAction = (updates: Partial<ActionConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  return (
    <ActionContext.Provider value={{ showAction, hideAction, updateAction, setGlobalLoading }}>
      <React.Suspense fallback={null}>
        <SearchParamsHandler isReady={isReady} setGlobalLoading={setGlobalLoading} />
      </React.Suspense>
      {children}
      <Loader show={!isReady || globalLoading} />
      <ActionOverlay
        show={show}
        title={config.title}
        message={config.message}
        color={config.color}
        icon={config.icon}
      />
    </ActionContext.Provider>
  );
}

export function useAction() {
  const context = useContext(ActionContext);
  if (context === undefined) {
    throw new Error("useAction must be used within an ActionProvider");
  }
  return context;
}
