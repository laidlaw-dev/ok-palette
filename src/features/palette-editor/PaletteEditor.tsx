import { ColorPicker } from '@/features/color-picker';
import { PaletteBoard } from '@/features/palette-board';

export const PaletteEditor = () => {
  return (
    <div className="flex h-full">
      <ColorPicker />
      <div className="flex-1 p-2">
        <PaletteBoard />
      </div>
    </div>
  );
};
