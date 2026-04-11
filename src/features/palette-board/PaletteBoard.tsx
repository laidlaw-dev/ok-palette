import { usePalette } from '@/stores/palette';
import { BaseColorsPanel } from './components/BaseColorsPanel';

export const PaletteBoard = () => {
  const { generatedPalette, removeColor } = usePalette();

  return (
    <div>
      <BaseColorsPanel
        colors={generatedPalette.allColors}
        onColorClick={removeColor}
      />
    </div>
  );
};
