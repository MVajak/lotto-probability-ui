import type React from 'react';
import { motion } from 'motion/react';

import { Spinner } from '@lotto/ui';

interface LoadingLayoutProps {
  title?: string;
  message?: string;
}

export const LoadingLayout: React.FC<LoadingLayoutProps> = ({ title, message }) => {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {/* Spinner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Spinner className="size-10 text-gold" />
      </motion.div>

      {/* Title */}
      {title && (
        <motion.h1
          className="text-foreground text-title-large-bold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {title}
        </motion.h1>
      )}

      {/* Message */}
      {message && (
        <motion.p
          className="text-body-default text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};
