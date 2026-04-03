import type { ReactNode } from 'react';

interface OkLabelProps {
  htmlFor: string;
  children: ReactNode;
}

export const OkLabel = ({ htmlFor, children }: OkLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-label font-[Open_Sans_Condensed] text-sm font-bold"
    >
      {children}
    </label>
  );
};
