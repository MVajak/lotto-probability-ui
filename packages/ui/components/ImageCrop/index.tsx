'use client';

import React, { createContext, useContext, useRef, useState } from 'react';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop, type PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './styles.css';

import { cn } from '@lotto/ui/utils';

import { Button } from '../Button';

// Constants for validation
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Context for sharing state between components
interface ImageCropContextValue {
  file: File | null;
  crop: Crop | undefined;
  setCrop: (crop: Crop | undefined) => void;
  completedCrop: PixelCrop | undefined;
  setCompletedCrop: (crop: PixelCrop | undefined) => void;
  imgRef: React.RefObject<HTMLImageElement | null>;
  onCrop?: (croppedImage: Blob) => void;
  aspect?: number;
  circularCrop?: boolean;
  maxImageSize?: number;
  maxOutputSize?: number;
  onComplete?: (crop: PixelCrop) => void;
  onChange?: (crop: Crop, percentageCrop: Crop) => void;
}

const ImageCropContext = createContext<ImageCropContextValue | undefined>(undefined);

const useImageCrop = () => {
  const context = useContext(ImageCropContext);
  if (!context) {
    throw new Error('useImageCrop must be used within an ImageCrop');
  }
  return context;
};

// Main container component
export interface ImageCropProps {
  file: File;
  onCrop?: (croppedImage: Blob) => void;
  children: React.ReactNode;
  aspect?: number;
  circularCrop?: boolean;
  maxImageSize?: number;
  maxOutputSize?: number;
  onComplete?: (crop: PixelCrop) => void;
  onChange?: (crop: Crop, percentageCrop: Crop) => void;
}

export const ImageCrop = ({
  file,
  onCrop,
  children,
  aspect,
  circularCrop = false,
  maxImageSize,
  maxOutputSize,
  onComplete,
  onChange,
}: ImageCropProps) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <ImageCropContext.Provider
      value={{
        file,
        crop,
        setCrop,
        completedCrop,
        setCompletedCrop,
        imgRef,
        onCrop,
        aspect,
        circularCrop,
        maxImageSize,
        maxOutputSize,
        onComplete,
        onChange,
      }}
    >
      <div className="space-y-4">{children}</div>
    </ImageCropContext.Provider>
  );
};

// Content component that shows the crop interface
export interface ImageCropContentProps {
  className?: string;
}

export const ImageCropContent = ({ className }: ImageCropContentProps) => {
  const { file, crop, setCrop, setCompletedCrop, imgRef, aspect, circularCrop, onComplete, onChange, maxImageSize } =
    useImageCrop();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (file) {
      setError(null);

      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setError('Invalid file type. Please upload an image file (JPEG, PNG, GIF, or WebP).');
        setImageSrc(null);
        return;
      }

      // Validate file size
      const maxSize = maxImageSize || DEFAULT_MAX_FILE_SIZE;
      if (file.size > maxSize) {
        const sizeMB = (maxSize / (1024 * 1024)).toFixed(1);
        setError(`File size exceeds ${sizeMB}MB limit.`);
        setImageSrc(null);
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        setImageSrc(reader.result as string);
        setError(null);
      };

      reader.onerror = () => {
        setError('Failed to read the file. Please try again.');
        setImageSrc(null);
      };

      reader.readAsDataURL(file);
    }
  }, [file, maxImageSize]);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;

    // Use 100% of the smaller dimension for maximum crop area
    const minDimension = Math.min(width, height);
    const cropSize = minDimension;

    // Create a centered square crop
    const crop = centerCrop(
      {
        unit: 'px',
        width: cropSize,
        height: cropSize,
      },
      width,
      height
    );

    // Apply aspect ratio if specified
    if (aspect) {
      const aspectCrop = makeAspectCrop(crop, aspect, width, height);
      setCrop(aspectCrop);
      setCompletedCrop(aspectCrop);
    } else {
      setCrop(crop);
      setCompletedCrop(crop);
    }
  };

  if (error) {
    return (
      <div className={cn('relative rounded-lg bg-destructive/10 p-4', className)}>
        <p className="text-center text-destructive text-sm">{error}</p>
      </div>
    );
  }

  if (!imageSrc) return null;

  return (
    <div
      className={cn('relative flex items-center justify-center overflow-visible rounded-lg bg-muted p-4', className)}
    >
      <ReactCrop
        crop={crop}
        onChange={(_, percentCrop) => {
          setCrop(percentCrop);
          onChange?.(_, percentCrop);
        }}
        onComplete={(c) => {
          setCompletedCrop(c);
          onComplete?.(c);
        }}
        aspect={aspect}
        circularCrop={circularCrop}
        className="mx-auto max-h-[400px]"
      >
        <img
          ref={imgRef}
          src={imageSrc}
          alt="Crop preview"
          onLoad={onImageLoad}
          className="mx-auto max-h-[400px] max-w-full"
          style={{ display: 'block' }}
        />
      </ReactCrop>
    </div>
  );
};

// Apply button component
export const ImageCropApply = () => {
  const { completedCrop, imgRef, onCrop, maxOutputSize } = useImageCrop();

  const handleApply = () => {
    if (!imgRef.current || !completedCrop || !onCrop) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Use maxOutputSize if provided, otherwise default to 2048px
    const maxSize = maxOutputSize || 2048;
    const outputSize = Math.min(completedCrop.width * scaleX, maxSize);
    canvas.width = outputSize;
    canvas.height = outputSize;

    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      outputSize,
      outputSize
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        onCrop(blob);
      },
      'image/png',
      1
    );
  };

  return (
    <Button type="button" onClick={handleApply} variant="primary">
      Apply Crop
    </Button>
  );
};

// Reset button component
export const ImageCropReset = () => {
  const { setCrop, imgRef } = useImageCrop();

  const handleReset = () => {
    if (!imgRef.current) return;

    const { naturalWidth: width, naturalHeight: height } = imgRef.current;
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1,
        width,
        height
      ),
      width,
      height
    );

    setCrop(crop);
  };

  return (
    <Button type="button" onClick={handleReset} variant="outline">
      Reset
    </Button>
  );
};
