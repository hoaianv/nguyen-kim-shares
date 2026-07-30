"use client";

import Loading from "@/components/ui/loading";
import { useStateStore } from "@/stores/stateStore";
import React from "react";

interface LoadingScreenProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Đang tải...",
  size = "md",
  variant = "spinner",
}) => {
  const { loading } = useStateStore();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-4 backdrop-blur-sm">
      <div className=" flex w-full max-w-sm flex-col items-center gap-4 px-8 py-7 text-center">
        <Loading message={message} size={size} variant={variant} />
      </div>
    </div>
  );
};

export default LoadingScreen;
