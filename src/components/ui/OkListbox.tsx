import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react/jsx-runtime';
import { buttonStyles } from './buttons/button-styles';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleChevronDown } from 'lucide-react';

interface OkListboxProps<T> {
  id?: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}

export const OkListbox = <T,>({
  value,
  onChange,
  options,
  id,
}: OkListboxProps<T>) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <ListboxButton as={Fragment} {...(id ? { id } : {})}>
            {({ focus, hover, active }) => (
              <button
                className={clsx(
                  buttonStyles.base,
                  'bg-surface bg-background border-control-border text-primary flex items-center justify-between py-1 pr-1 pl-2 font-[Open_Sans_Condensed]',
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
                {selectedOption?.label}
                <CircleChevronDown
                  className={clsx('ml-2 h-4 w-4 transition-transform', {
                    'rotate-180': open,
                  })}
                />
              </button>
            )}
          </ListboxButton>
          <AnimatePresence>
            {open && (
              <ListboxOptions
                static
                as={motion.div}
                anchor="bottom"
                className="bg-background border-control-border mt-1 rounded border shadow-md"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                {options.map((option) => (
                  <ListboxOption
                    key={option.label}
                    value={option.value}
                    as={Fragment}
                  >
                    {({ focus, selected }) => (
                      <div
                        className={clsx(
                          'px-4 py-1 font-[Open_Sans_Condensed] transition',
                          {
                            'text-primary bg-primary/10': focus,
                            'text-label': !focus,
                            'font-bold': selected,
                          }
                        )}
                      >
                        {option.label}
                      </div>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            )}
          </AnimatePresence>
        </>
      )}
    </Listbox>
  );
};
