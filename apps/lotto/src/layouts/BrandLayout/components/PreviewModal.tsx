import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { Dialog, DialogContent, DialogTitle, IconButton, Spinner } from '@lotto/ui';

const demoImages = [
  '/img/demo/home_page_1.png',
  '/img/demo/home_page_2.png',
  '/img/demo/number_detail_1.png',
  '/img/demo/number_detail_2.png',
];

// Preload all images and return a promise that resolves when all are loaded
const preloadImages = (urls: string[]): Promise<void[]> => {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Resolve even on error to not block
          img.src = url;
        })
    )
  );
};

interface PreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PreviewModal = ({ open, onOpenChange }: PreviewModalProps) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images when dialog opens
  useEffect(() => {
    if (open && !imagesLoaded) {
      preloadImages(demoImages).then(() => setImagesLoaded(true));
    }
  }, [open, imagesLoaded]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? demoImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === demoImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] p-0 sm:max-w-4xl">
        <DialogTitle className="sr-only">{t('authLayout.previewAlt')}</DialogTitle>
        <div className="relative">
          {/* Image carousel */}
          <div className="relative w-full overflow-hidden rounded-2xl bg-background">
            {!imagesLoaded ? (
              <div className="flex aspect-16/10 items-center justify-center">
                <Spinner className="size-10 text-gold" />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={demoImages[currentIndex]}
                  alt={t('authLayout.previewAlt')}
                  className="w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
            )}

            {/* Navigation arrows */}
            <div className="absolute inset-y-0 left-2 flex items-center">
              <IconButton
                label="Previous"
                variant="secondary"
                onClick={goToPrevious}
                className="bg-background/80 backdrop-blur-sm"
              >
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <div className="absolute inset-y-0 right-2 flex items-center">
              <IconButton
                label="Next"
                variant="secondary"
                onClick={goToNext}
                className="bg-background/80 backdrop-blur-sm"
              >
                <ChevronRightIcon />
              </IconButton>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="-translate-x-1/2 absolute bottom-4 left-1/2 flex gap-2">
            {demoImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`size-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-6 bg-foreground' : 'bg-foreground/40 hover:bg-foreground/60'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
