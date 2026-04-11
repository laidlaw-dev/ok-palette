import type { OkColor } from '@/domain/color';
import { DeleteColorButton } from './DeleteColorButton';

interface BaseColorProps {
  name: string;
  color: OkColor;
  onClick: () => void;
}

export const BaseColor = ({ name, color, onClick }: BaseColorProps) => {
  return (
    <div className="flex w-16 flex-col items-center justify-center">
      <div className="text-label max-w-full truncate text-xs">{name}</div>
      <DeleteColorButton label={name} color={color} onClick={onClick} />
    </div>
  );
};
