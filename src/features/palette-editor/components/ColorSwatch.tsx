import type { OkColor } from '@/domain/color';

interface ColorSwatchProps {
  color: OkColor;
}

export const ColorSwatch = ({ color }: ColorSwatchProps) => {
  return (
    <div className="h-6 w-8 rounded" style={{ backgroundColor: color.css }} />
  );
};
