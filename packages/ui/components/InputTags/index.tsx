'use client';

import * as React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { cn } from '../../utils';
import { Badge } from '../Badge';

export interface InputTagsProps extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  value: string[];
  onChange: (tags: string[]) => void;
  validateTag?: (tag: string) => boolean;
  placeholder?: string;
  disabled?: boolean;
}

export function InputTags({
  value,
  onChange,
  validateTag,
  placeholder,
  disabled = false,
  className,
  ...props
}: InputTagsProps) {
  const [inputValue, setInputValue] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const inputId = React.useId();

  const isValidTag = (tag: string): boolean => {
    if (!tag.trim()) return false;
    if (validateTag) return validateTag(tag.trim());
    return true;
  };

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (isValidTag(trimmed) && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    if (!disabled) {
      onChange(value.filter((_, i) => i !== index));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue.includes(',')) {
      const parts = newValue.split(',');
      const lastPart = parts.pop() || '';
      const newTags: string[] = [];

      for (const part of parts) {
        const trimmed = part.trim();
        if (isValidTag(trimmed) && !value.includes(trimmed) && !newTags.includes(trimmed)) {
          newTags.push(trimmed);
        }
      }

      if (newTags.length > 0) {
        onChange([...value, ...newTags]);
      }
      setInputValue(lastPart);
    } else {
      setInputValue(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (inputValue.trim()) {
      addTag(inputValue);
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !disabled) {
      const input = e.currentTarget.querySelector('input');
      input?.focus();
    }
  };

  return (
    <div
      data-slot="input-tags"
      className={cn(
        'flex min-h-[105px] w-full flex-wrap content-start gap-2 rounded-xl border bg-transparent px-4 py-3 text-body-large transition-[color,box-shadow]',
        isFocused ? 'ring-2 ring-muted-foreground' : 'border-input',
        disabled && 'opacity-50',
        className
      )}
      onClick={handleContainerClick}
      {...props}
    >
      {value.map((tag, index) => (
        <Badge key={`${tag}-${index}`} variant="secondary" className="py-0.5">
          {tag}
          {!disabled && (
            <XMarkIcon onClick={() => removeTag(index)} className="cursor-pointer text-subtle-foreground" />
          )}
        </Badge>
      ))}

      <input
        id={inputId}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={() => setIsFocused(true)}
        placeholder={value.length === 0 ? placeholder : ''}
        disabled={disabled}
        className="min-w-[200px] flex-1 bg-transparent text-body-large text-foreground outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}
