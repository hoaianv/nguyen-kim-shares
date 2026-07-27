"use client";

import Image from "next/image";
import React from "react";

interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
  showMessage?: boolean;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  message = "Đang tải...",
  size = "md",
  variant = "spinner",
  showMessage = true,
  className = "",
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-12 h-12";
      case "lg":
        return "w-20 h-20";
      default:
        return "w-16 h-16";
    }
  };

  const getLogoSize = () => {
    switch (size) {
      case "sm":
        return { width: 24, height: 24 };
      case "lg":
        return { width: 48, height: 48 };
      default:
        return { width: 32, height: 32 };
    }
  };

  const renderSpinner = () => (
    <div className="relative flex items-center justify-center">
      <div
        className={`${getSizeClasses()} animate-spin rounded-lg border-4 border-border border-t-amber-500`}
        role="status"
        aria-label="Loading"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/images/logo.png"
          width={getLogoSize().width}
          height={getLogoSize().height}
          alt="Logo loading"
          className="rounded-lg"
        />
      </div>
    </div>
  );

  const renderDots = () => (
    <div className="flex flex-col items-center space-y-3">
      <Image
        src="/images/logo.png"
        width={getLogoSize().width}
        height={getLogoSize().height}
        alt="Logo loading"
        className="rounded-lg"
      />
      <div className="flex space-x-1">
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-amber-500"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-amber-500"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-amber-500"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );

  const renderPulse = () => (
    <div className="relative flex items-center justify-center">
      <div
        className={`${getSizeClasses()} animate-pulse rounded-lg bg-amber-500/80 opacity-75`}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/images/logo.png"
          width={getLogoSize().width}
          height={getLogoSize().height}
          alt="Logo loading"
          className="rounded-lg"
        />
      </div>
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      {renderLoader()}
      {showMessage && (
        <p className="text-center text-sm font-medium text-muted-foreground">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;

