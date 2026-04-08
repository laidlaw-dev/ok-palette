import { usePalette } from '@/stores/palette';
import { ColorPicker } from '@/features/color-picker';
import { ColorsBar } from './components/ColorsBar';

export const PaletteEditor = () => {
  const { generatedPalette } = usePalette();

  return (
    <div className="flex h-full">
      <ColorPicker />
      <div className="flex-1 p-2">
        <ColorsBar colors={generatedPalette.allColors} />
      </div>
    </div>
  );
};
