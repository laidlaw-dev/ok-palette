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
  describe('removeColor', () => {
    it('removes a color from the store and it is no longer in the generated palette', () => {
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

      let palette = result.current.generatedPalette;

      const addedColor = palette.allColors.find((c) =>
        c.color.equals(newColor)
      );
      expect(addedColor).toBeDefined();

      act(() => {
        if (addedColor) {
          result.current.removeColor(addedColor.id);
        }
      });

      palette = result.current.generatedPalette;

      const removedColor = palette.allColors.find((c) =>
        c.color.equals(newColor)
      );
      expect(removedColor).toBeUndefined();
    });
  });
  describe('addColorSet', () => {
    it('adds a color set to the store and includes it in the generated palette', () => {
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

      act(() => {
        result.current.addColorSet('test_color_set', 'default');
      });

      const palette = result.current.generatedPalette;

      const addedColorSet = palette.colorSets.find(
        (set) => set.name === 'test_color_set'
      );
      expect(addedColorSet).toBeDefined();
    });
  });
  describe('removeColorSet', () => {
    it('removes a color set from the store and it is no longer in the generated palette', () => {
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

      act(() => {
        result.current.addColorSet('test_color_set', 'default');
      });

      let palette = result.current.generatedPalette;

      const addedColorSet = palette.colorSets.find(
        (set) => set.name === 'test_color_set'
      );
      expect(addedColorSet).toBeDefined();

      act(() => {
        if (addedColorSet) {
          result.current.removeColorSet(addedColorSet.id);
        }
      });

      palette = result.current.generatedPalette;

      const removedColorSet = palette.colorSets.find(
        (set) => set.name === 'test_color_set'
      );
      expect(removedColorSet).toBeUndefined();
    });
  });
  describe('addColorToSet', () => {
    it('adds a color to a color set and it is included in the generated palette', () => {
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

      act(() => {
        result.current.addColorSet('test_set_1', 'default');
        result.current.addColorSet('test_set_2', 'default');
      });

      const colorId = result.current.generatedPalette.allColors[0].id;
      const test_set_1_id = result.current.generatedPalette.colorSets[0].id;
      const test_set_2_id = result.current.generatedPalette.colorSets[1].id;

      act(() => {
        result.current.addColorToSet(test_set_1_id, colorId);
        result.current.addColorToSet(test_set_2_id, colorId);
      });

      const updatedPalette = result.current.generatedPalette;

      const colorInSet1 = updatedPalette.colorSets[0].colors.find(
        (c) => c.id === colorId
      );
      const colorInSet2 = updatedPalette.colorSets[1].colors.find(
        (c) => c.id === colorId
      );
      expect(colorInSet1).toBeDefined();
      expect(colorInSet2).toBeDefined();
    });
  });
  describe('removeColorFromSet', () => {
    it('removes a color from a color set and it is no longer included in the generated palette for that set', () => {
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

      act(() => {
        result.current.addColorSet('test_set_1', 'default');
        result.current.addColorSet('test_set_2', 'default');
      });

      const colorId = result.current.generatedPalette.allColors[0].id;
      const test_set_1_id = result.current.generatedPalette.colorSets[0].id;
      const test_set_2_id = result.current.generatedPalette.colorSets[1].id;

      act(() => {
        result.current.addColorToSet(test_set_1_id, colorId);
        result.current.addColorToSet(test_set_2_id, colorId);
      });

      let updatedPalette = result.current.generatedPalette;

      let colorInSet1 = updatedPalette.colorSets[0].colors.find(
        (c) => c.id === colorId
      );
      let colorInSet2 = updatedPalette.colorSets[1].colors.find(
        (c) => c.id === colorId
      );
      expect(colorInSet1).toBeDefined();
      expect(colorInSet2).toBeDefined();

      act(() => {
        result.current.removeColorFromSet(test_set_1_id, colorId);
      });

      updatedPalette = result.current.generatedPalette;

      colorInSet1 = updatedPalette.colorSets[0].colors.find(
        (c) => c.id === colorId
      );
      colorInSet2 = updatedPalette.colorSets[1].colors.find(
        (c) => c.id === colorId
      );

      expect(colorInSet1?.isInSet).toBe(false);
      expect(colorInSet2?.isInSet).toBe(true);
    });
  });
});
