import type { OkColor } from '@/domain/color';
import { FixedColorSwatch } from './FixedColorSwatch';

interface ColorsBarProps {
  colors: { name?: string; color: OkColor; id: string }[];
}

export const ColorsBar = ({ colors }: ColorsBarProps) => {
  return (
    <div className="flex gap-1">
      {colors.map((color) => (
        <FixedColorSwatch
          key={color.id}
          color={color.color}
          name={color.name}
        />
      ))}
    </div>
  );
};
