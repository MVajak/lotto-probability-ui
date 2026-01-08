import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface ExpandableListProps {
  label: string;
  items: string[];
  isOpen: boolean;
  onToggle: () => void;
}

export const ExpandableList = ({ label, items, isOpen, onToggle }: ExpandableListProps) => {
  const { t } = useTranslation();

  return (
    <div className="ml-13 flex flex-col gap-2">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-fit items-center gap-1.5 text-body-small text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronDownIcon className={`size-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        {t(label)}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-1.5">
              {items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-background/50 px-2.5 py-0.5 text-body-small text-muted-foreground"
                >
                  {t(item)}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
