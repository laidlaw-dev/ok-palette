import { Button } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, type ReactNode } from 'react';

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
              'bg-primary text-primary-contrast rounded px-4 py-1 font-[Open_Sans_Condensed] transition',
              {
                'ring-hover ring-2': hover && !focus && !active,
              },
              {
                'ring-active shadow-control-border shadow-round-lg ring-1':
                  active,
              },
              {
                'ring-focus ring-2': focus,
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
