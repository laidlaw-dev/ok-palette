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
    it('initializes with provided color and default color and palette names', () => {
      const initialColor = new OkColor({
        hue: 120,
        lightness: 0.5,
        harmonizedChroma: 0.5,
      });

      usePaletteStore.getState().initialize('primary', initialColor);

      const result = usePaletteStore.getState();

      expect(result.primaryColor.equals(initialColor)).toBe(true);

      expect(result.colors.length).toBe(1);
      expect(result.colors[0].name).toBe('primary');
      expect(result.colors[0].hue).toBe(initialColor.hue);

      expect(result.palettes.length).toBe(1);
      expect(result.palettes[0].name).toBeUndefined();
      expect(result.palettes[0].defaultLightness).toBe(initialColor.lightness);
      expect(result.palettes[0].defaultChroma).toBe(
        initialColor.harmonizedChroma
      );
      expect(result.palettes[0].colorSetIds.length).toBe(0);

      expect(result.selectedPaletteId).toBe(result.palettes[0].id);
    });
  });
  describe('addColor', () => {
    it('adds a new color to the store', () => {
      const initialColor = new OkColor({
        hue: 120,
        lightness: 0.5,
        harmonizedChroma: 0.5,
      });
      usePaletteStore.getState().initialize('primary', initialColor);

      const newColor = new OkColor({
        hue: 240,
        lightness: 0.5,
        harmonizedChroma: 0.5,
      });
      usePaletteStore.getState().addColor('New Color', newColor);

      const result = usePaletteStore.getState();

      expect(result.colors.length).toBe(2);
      expect(result.colors[1].name).toBe('New Color');
      expect(result.colors[1].hue).toBe(newColor.hue);
    });
  });
});
