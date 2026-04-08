import { renderHook, act } from '@testing-library/react';

import { usePalette } from './usePalette';
import { OkColor } from '@/domain/color';

describe('usePalette', () => {
  it('returns default values when not initialized', () => {
    const { result } = renderHook(() => usePalette());
    expect(result.current.isInitialized).toBe(false);
  });
  describe('initialization', () => {
    it('returns isInitialized as true after initialization', () => {
      const { result } = renderHook(() => usePalette());
      act(() => {
        result.current.initialize(
          'primary',
          new OkColor({
            hue: 120,
            lightness: 0.5,
            harmonizedChroma: 0.5,
          })
        );
      });
      expect(result.current.isInitialized).toBe(true);
    });
    it('returns generated palette after initialization', () => {
      const { result } = renderHook(() => usePalette());
      act(() => {
        result.current.initialize(
          'primary',
          new OkColor({
            hue: 120,
            lightness: 0.5,
            harmonizedChroma: 0.5,
          })
        );
      });

      const palette = result.current.generatedPalette;

      const color = palette.allColors[0];
      expect(color.name).toBe('primary');
      expect(
        new OkColor({
          hue: 120,
          lightness: 0.5,
          harmonizedChroma: 0.5,
        }).equals(color.color)
      ).toBe(true);
    });
  });
  describe('addColor', () => {
    it('adds a color to the store and includes it in the generated palette', () => {
      const { result } = renderHook(() => usePalette());
      act(() => {
        result.current.initialize(
          'primary',
          new OkColor({
            hue: 120,
            lightness: 0.5,
            harmonizedChroma: 0.5,
          })
        );
      });

      const newColor = new OkColor({
        hue: 240,
        lightness: 0.5,
        harmonizedChroma: 0.5,
      });
      act(() => {
        result.current.addColor('test_color', newColor);
      });

      const palette = result.current.generatedPalette;

      const addedColor = palette.allColors.find((c) =>
        c.color.equals(newColor)
      );
      expect(addedColor).toBeDefined();
      expect(addedColor?.name).toBe('test_color');
    });
  });
});
