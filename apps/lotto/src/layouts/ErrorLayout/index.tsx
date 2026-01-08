import type React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';

import { Button } from '@lotto/ui';

interface ErrorLayoutProps {
  title: string;
  message?: string;
  actionLabel?: string;
  actionPath?: string;
  children?: React.ReactNode;
}

export const ErrorLayout: React.FC<ErrorLayoutProps> = ({ title, message, actionLabel, actionPath, children }) => {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {/* Icon with glow */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="absolute inset-0 scale-150 rounded-full bg-primary-red/20 blur-xl" />
        <div className="relative flex size-20 items-center justify-center rounded-full bg-primary-red/10">
          <ExclamationCircleIcon className="size-10 text-primary-red" />
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

      {/* Action button or custom children */}
      {(children || (actionLabel && actionPath)) && (
        <motion.div
          className="w-full pt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {children ||
            (actionLabel && actionPath && (
              <Button asChild size="lg" className="w-full">
                <Link to={actionPath}>{actionLabel}</Link>
              </Button>
            ))}
        </motion.div>
      )}
    </div>
  );
};
