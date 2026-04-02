import { OkColor } from '@/domain/color';
import { usePaletteStore } from './palette-store';

describe('PaletteStore', () => {
  beforeEach(() => {
    usePaletteStore.getState().reset();
  });
  it('is created with default values', () => {
    const result = usePaletteStore.getState();

    expect(result.colors.length).toBe(0);
    expect(result.palettes.length).toBe(0);
    expect(result.colorSets.length).toBe(0);
    expect(result.selectedPaletteId).toBe('');
  });
  describe('initialization', () => {
    it('initializes with provided color and palette names', () => {
      const initialColor = new OkColor({
        hue: 120,
        lightness: 0.5,
        harmonizedChroma: 0.5,
      });

      const paletteName = 'test_palette';
      const colorName = 'test_color';

      usePaletteStore.getState().initialize({
        initalColor: initialColor,
        paletteName,
        colorName,
      });

      const result = usePaletteStore.getState();

      expect(result.colors.length).toBe(1);
      expect(result.colors[0].name).toBe(colorName);
      expect(result.colors[0].hue).toBe(initialColor.hue);

      expect(result.palettes.length).toBe(1);
      expect(result.palettes[0].name).toBe(paletteName);
      expect(result.palettes[0].defaultLightness).toBe(initialColor.lightness);
      expect(result.palettes[0].defaultChroma).toBe(
        initialColor.harmonizedChroma
      );
      expect(result.palettes[0].colorSetIds.length).toBe(0);

      expect(result.selectedPaletteId).toBe(result.palettes[0].id);
    });
  });
});
