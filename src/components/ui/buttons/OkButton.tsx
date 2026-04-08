import { Fragment, type ReactNode } from 'react';
import { buttonStyles } from './button-styles';
import { Button } from '@headlessui/react';
import clsx from 'clsx';

interface OkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const OkButton = ({ children, ...props }: OkButtonProps) => {
  return (
    <Button as={Fragment} {...props}>
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
              'bg-primary border-primary text-primary-contrast px-4 py-1 font-[Open_Sans_Condensed]',
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
          >
            {children}
          </button>
        );
      }}
    </Button>
  );
};
