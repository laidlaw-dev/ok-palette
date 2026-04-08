import type { OkColor } from '@/domain/color';
import { buttonStyles } from './button-styles';
import { Button } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react/jsx-runtime';

interface OkColorButtonProps {
  color: OkColor;
  onClick: () => void;
}

export const OkColorButton = ({ color, onClick }: OkColorButtonProps) => {
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
              'h-6 w-6',
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
            aria-label={color.hex}
          />
        );
      }}
    </Button>
  );
};
