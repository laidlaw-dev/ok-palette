import { buttonStyles } from '@/components/ui';
import type { OkColor } from '@/domain/color';
import { Button } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react/jsx-runtime';
import { Minus } from 'lucide-react';

interface DeleteColorButtonProps {
  label?: string;
  color: OkColor;
  onClick: () => void;
}

export const DeleteColorButton = ({
  color,
  onClick,
  label,
}: DeleteColorButtonProps) => {
  return (
    <Button as={Fragment}>
      {({
        focus,
        hover,
        active,
      }: {
        focus: boolean;
        hover: boolean;
        active: boolean;
      }) => {
        return (
          <button
            className={clsx(
              buttonStyles.base,
              'relative flex h-8 w-12 items-center justify-center',
              {
                [buttonStyles.hover]: hover && !focus && !active,
              },
              {
                [buttonStyles.active]: active,
              },
              {
                [buttonStyles.focus]: focus,
              }
            )}
            style={{ backgroundColor: color.css, borderColor: color.css }}
            onClick={onClick}
            aria-label={label || color.hex}
          >
            <div
              className={clsx(
                'transform-opacity absolute inset-auto flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-xs text-white transition-opacity duration-200',
                {
                  'opacity-0': !hover && !focus && !active,
                  'opacity-100': hover || focus || active,
                }
              )}
            >
              <Minus size="inherit" />
            </div>
          </button>
        );
      }}
    </Button>
  );
};
