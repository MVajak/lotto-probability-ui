import { EyeIcon } from '@heroicons/react/24/outline';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface PreviewThumbnailProps {
  onClick: () => void;
}

export const PreviewThumbnail = ({ onClick }: PreviewThumbnailProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <button
        type="button"
        onClick={onClick}
        className="group relative w-64 overflow-hidden rounded-xl border border-border/50 bg-background/30 shadow-lg transition-all hover:border-primary/50 hover:shadow-xl"
      >
        <div className="aspect-video w-full">
          <img
            src="/img/demo/home_page_1.png"
            alt={t('authLayout.previewAlt')}
            className="size-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-background/40 transition-colors group-hover:bg-background/20">
          <span className="flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5 text-body-small-bold text-foreground shadow-lg backdrop-blur-sm">
            <EyeIcon className="size-4" />
            {t('authLayout.previewButton')}
          </span>
        </div>
      </button>
    </motion.div>
  );
};
