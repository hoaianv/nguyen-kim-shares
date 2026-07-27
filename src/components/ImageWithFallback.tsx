"use client";
import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, "src" | "onError"> {
  src: string;
  fallbackSrc?: string;
  alt: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc = "/images/no-images.jpg",
  alt,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return <Image {...props} src={imgSrc} alt={alt} onError={handleError} />;
};

export default ImageWithFallback;
