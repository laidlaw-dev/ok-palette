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
          new OkColor({
            hue: 120,
            lightness: 0.5,
            harmonizedChroma: 0.5,
          })
        );
      });

      const palette = result.current.generatedPalette;

      const color = palette.allColors[0];
      expect(color.name).toBeUndefined();
      expect(
        new OkColor({
          hue: 120,
          lightness: 0.5,
          harmonizedChroma: 0.5,
        }).equals(color.color)
      ).toBe(true);
    });
  });
});
