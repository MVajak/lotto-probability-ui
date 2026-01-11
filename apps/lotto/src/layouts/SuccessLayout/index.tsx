import type React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'motion/react';

interface SuccessLayoutProps {
  title: string;
  message?: string;
  children?: React.ReactNode;
}

export const SuccessLayout: React.FC<SuccessLayoutProps> = ({ title, message, children }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-center">
      {/* Icon with glow */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="absolute inset-0 scale-150 rounded-full bg-primary-green/20 blur-xl" />
        <div className="relative flex size-20 items-center justify-center rounded-full bg-primary-green/10">
          <CheckCircleIcon className="size-10 text-primary-green" />
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-foreground text-title-large-bold"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {title}
      </motion.h1>

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

      {/* Optional children (e.g., action buttons) */}
      {children && (
        <motion.div
          className="w-full pt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};
