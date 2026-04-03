import type { ReactNode } from 'react';

interface OkTitleProps {
  children: ReactNode;
}

export const OkTitle = ({ children }: OkTitleProps) => {
  return (
    <h3 className="text-label font-[Open_Sans_Condensed] text-lg font-bold">
      {children}
    </h3>
  );
};
