import { Input } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';

interface OkInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

export const OkInput = ({ invalid = false, ref, ...props }: OkInputProps) => {
  return (
    <Input as={Fragment} invalid={invalid} {...props}>
      {({ focus, hover }: { focus: boolean; hover: boolean }) => {
        return (
          <input
            ref={ref}
            className={clsx(
              'rounded border px-2 py-1 transition-colors',
              {
                'border-control-border text-control-text bg-control-bg':
                  !invalid,
              },
              {
                'ring-hover ring-2': hover && !focus && !invalid,
              },
              {
                'ring-focus ring-2': focus && !invalid,
              },
              {
                'border-error-border text-error-text bg-error-bg': invalid,
              },
              {
                'ring-error-hover ring-2': hover && !focus && invalid,
              },
              {
                'ring-error-active ring-2': focus && invalid,
              }
            )}
          />
        );
      }}
    </Input>
  );
};
