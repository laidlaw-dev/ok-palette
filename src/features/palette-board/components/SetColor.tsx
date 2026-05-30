import type { OkColor } from '@/domain/color';
import { Button } from '@headlessui/react';
import { buttonStyles } from '@/components/ui';
import clsx from 'clsx';
import { Fragment } from 'react';

interface SetColorProps {
  name: string;
  color: OkColor;
  isInUse: boolean;
  onAddClick: () => void;
  onDeleteClick: () => void;
}

export const SetColor = ({
  color,
  isInUse,
  onAddClick,
  onDeleteClick,
}: SetColorProps) => {
  const backgroundColor = isInUse ? color.css : 'transparent';
  const borderColor = color.css;
  return (
    <div className="flex w-16 flex-col items-center justify-center">
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
              style={{
                backgroundColor: backgroundColor,
                borderColor: borderColor,
              }}
              onClick={isInUse ? onDeleteClick : onAddClick}
              aria-label={color.hex}
            ></button>
          );
        }}
      </Button>
    </div>
  );
};
