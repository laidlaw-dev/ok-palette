import { Fragment, type ReactNode } from 'react';
import { buttonStyles } from './button-styles';
import { Button } from '@headlessui/react';
import clsx from 'clsx';

interface OkIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const OkIconButton = ({ children, ...props }: OkIconButtonProps) => {
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
              buttonStyles.baseRound,
              'text-primary bg-transparent px-1 py-1',
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
