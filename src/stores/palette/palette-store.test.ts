import { OkColor } from '@/domain/color';
import { usePaletteStore } from './palette-store';
import {
  colorAlreadyInSetError,
  colorNotFoundError,
  colorNotInSetError,
  colorSetNotFoundError,
} from './palette-errors';

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
      expect(result.palettes[0].colorSetValues.length).toBe(0);

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
  describe('removeColor', () => {
    it('removes a color from the store by id', () => {
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
      usePaletteStore.getState().addColor('new_color', newColor);

      const colorIdToRemove = usePaletteStore.getState().colors[0].id;
      usePaletteStore.getState().removeColor(colorIdToRemove);

      const result = usePaletteStore.getState();

      expect(result.colors.length).toBe(1);
      expect(result.colors[0].id).not.toBe(colorIdToRemove);
    });
    it('removes color from color sets when color is removed', () => {
      const initialColor = new OkColor({
        hue: 120,
        lightness: 0.5,
        harmonizedChroma: 0.5,
      });
      const color_1 = new OkColor({
        hue: 240,
        lightness: 0.5,
        harmonizedChroma: 0.5,
      });
      const color_2 = new OkColor({
        hue: 60,
        lightness: 0.5,
        harmonizedChroma: 0.5,
      });

      usePaletteStore.getState().initialize('primary', initialColor);
      usePaletteStore.getState().addColor('color_1', color_1);
      usePaletteStore.getState().addColor('color_2', color_2);

      const initialColorId = usePaletteStore.getState().colors[0].id;
      const color_1_id = usePaletteStore.getState().colors[1].id;
      const color_2_id = usePaletteStore.getState().colors[2].id;

      usePaletteStore.getState().addColorSet('test_set_1', 'default');
      usePaletteStore.getState().addColorSet('test_set_2', 'default');

      const colorSet_1_id = usePaletteStore.getState().colorSets[0].id;
      const colorSet_2_id = usePaletteStore.getState().colorSets[1].id;

      usePaletteStore.getState().addColorToSet(colorSet_1_id, initialColorId);
      usePaletteStore.getState().addColorToSet(colorSet_1_id, color_1_id);
      usePaletteStore.getState().addColorToSet(colorSet_1_id, color_2_id);

      usePaletteStore.getState().addColorToSet(colorSet_2_id, color_1_id);
      usePaletteStore.getState().addColorToSet(colorSet_2_id, color_2_id);

      usePaletteStore.getState().removeColor(color_1_id);

      const updatedResult = usePaletteStore.getState();

      expect(updatedResult.colorSets[0].colorIds).toContain(initialColorId);
      expect(updatedResult.colorSets[0].colorIds).toContain(color_2_id);
      expect(updatedResult.colorSets[0].colorIds).not.toContain(color_1_id);

      expect(updatedResult.colorSets[0].colorIds).toContain(color_2_id);
      expect(updatedResult.colorSets[0].colorIds).not.toContain(color_1_id);
    });
    it('throws an error if color to remove does not exist', () => {
      const initialColor = new OkColor({
        hue: 120,
        lightness: 0.5,
        harmonizedChroma: 0.5,
      });
      usePaletteStore.getState().initialize('primary', initialColor);

      expect(() => {
        usePaletteStore.getState().removeColor('non_existent_color_id');
      }).toThrow(colorNotFoundError('non_existent_color_id'));
    });
  });
  describe('addColorSet', () => {
    it('adds a new default color set to the store', () => {
      const initialColor = new OkColor({
        hue: 120,
        lightness: 0.7,
        harmonizedChroma: 0.95,
      });
      usePaletteStore.getState().initialize('primary', initialColor);

      usePaletteStore.getState().addColorSet('test_set', 'default');

      const result = usePaletteStore.getState();

      expect(result.colorSets.length).toBe(1);
      expect(result.colorSets[0].name).toBe('test_set');
      expect(result.colorSets[0].colorIds.length).toBe(0);

      //  Add to palettes
      expect(result.palettes.length).toBe(1);
      expect(result.palettes[0].colorSetValues.length).toBe(1);
      const colorSetValue = result.palettes[0].colorSetValues[0];
      expect(colorSetValue.colorSetId).toBe(result.colorSets[0].id);
      expect(colorSetValue.lightness).toBe(0.7);
      expect(colorSetValue.chroma).toBe(0.95);
    });
    it('adds a new text color set to the store', () => {
      const initialColor = new OkColor({
        hue: 120,
        lightness: 0.7,
        harmonizedChroma: 0.95,
      });
      usePaletteStore.getState().initialize('primary', initialColor);

      usePaletteStore.getState().addColorSet('test_set', 'text');

      const result = usePaletteStore.getState();

      const colorSetValue = result.palettes[0].colorSetValues[0];
      expect(colorSetValue.colorSetId).toBe(result.colorSets[0].id);
      expect(colorSetValue.lightness).toBe(0.1);
      expect(colorSetValue.chroma).toBe(0.1);
    });
    it('adds a new surface color set to the store', () => {
      const initialColor = new OkColor({
        hue: 120,
        lightness: 0.7,
        harmonizedChroma: 0.95,
      });
      usePaletteStore.getState().initialize('primary', initialColor);

      usePaletteStore.getState().addColorSet('test_set', 'surface');

      const result = usePaletteStore.getState();

      const colorSetValue = result.palettes[0].colorSetValues[0];
      expect(colorSetValue.colorSetId).toBe(result.colorSets[0].id);
      expect(colorSetValue.lightness).toBe(0.9);
      expect(colorSetValue.chroma).toBe(0.95);
    });
    it('adds a new border color set to the store', () => {
      const initialColor = new OkColor({
        hue: 120,
        lightness: 0.7,
        harmonizedChroma: 0.95,
      });
      usePaletteStore.getState().initialize('primary', initialColor);

      usePaletteStore.getState().addColorSet('test_set', 'border');

      const result = usePaletteStore.getState();

      const colorSetValue = result.palettes[0].colorSetValues[0];
      expect(colorSetValue.colorSetId).toBe(result.colorSets[0].id);
      expect(colorSetValue.lightness).toBe(0.6);
      expect(colorSetValue.chroma).toBe(0.95);
    });
  });
  describe('removeColorSet', () => {
    it('removes a color set from the store by id and removes it from palettes', () => {
      const initialColor = new OkColor({
        hue: 120,
        lightness: 0.7,
        harmonizedChroma: 0.95,
      });
      usePaletteStore.getState().initialize('primary', initialColor);

      usePaletteStore.getState().addColorSet('test_set_1', 'default');
      usePaletteStore.getState().addColorSet('test_set_2', 'default');

      const result = usePaletteStore.getState();

      const test_set_1_id = result.colorSets[0].id;
      const test_set_2_id = result.colorSets[1].id;

      expect(result.colorSets.length).toBe(2);
      expect(result.palettes[0].colorSetValues.length).toBe(2);

      usePaletteStore.getState().removeColorSet(test_set_1_id);

      const updatedResult = usePaletteStore.getState();

      expect(updatedResult.colorSets.length).toBe(1);
      expect(updatedResult.colorSets[0].id).toBe(test_set_2_id);

      expect(updatedResult.palettes[0].colorSetValues.length).toBe(1);
      expect(updatedResult.palettes[0].colorSetValues[0].colorSetId).toBe(
        test_set_2_id
      );
    });
    it('throws an error if color set to remove does not exist', () => {
      const initialColor = new OkColor({
        hue: 120,
        lightness: 0.7,
        harmonizedChroma: 0.95,
      });
      usePaletteStore.getState().initialize('primary', initialColor);

      expect(() => {
        usePaletteStore.getState().removeColorSet('non_existent_color_set_id');
      }).toThrow(colorSetNotFoundError('non_existent_color_set_id'));
    });
  });
  describe('addColorToSet', () => {
    it('adds a color to a color set', () => {
      const initialColor = new OkColor({
        hue: 120,
        lightness: 0.7,
        harmonizedChroma: 0.95,
      });
      usePaletteStore.getState().initialize('primary', initialColor);

      usePaletteStore.getState().addColorSet('test_set_1', 'default');
      usePaletteStore.getState().addColorSet('test_set_2', 'default');

      const result = usePaletteStore.getState();

      const colorId = result.colors[0].id;
      const test_set_2_id = result.colorSets[1].id;

      usePaletteStore.getState().addColorToSet(test_set_2_id, colorId);

      const updatedResult = usePaletteStore.getState();

      //  Only added to test_set_2
      expect(updatedResult.colorSets[0].colorIds).not.toContain(colorId);

      expect(updatedResult.colorSets[1].colorIds).toContain(colorId);
    });
    it('throws an error if color does not exist', () => {
      const initialColor = new OkColor({
        hue: 120,
        lightness: 0.7,
        harmonizedChroma: 0.95,
      });
      usePaletteStore.getState().initialize('primary', initialColor);

      usePaletteStore.getState().addColorSet('test_set_1', 'default');

      const result = usePaletteStore.getState();

      const test_set_1_id = result.colorSets[0].id;

      expect(() => {
        usePaletteStore
          .getState()
          .addColorToSet(test_set_1_id, 'non_existent_color_id');
      }).toThrow(colorNotFoundError('non_existent_color_id'));
    });
    it('throws an error if color set does not exist', () => {
      const initialColor = new OkColor({
        hue: 120,
        lightness: 0.7,
        harmonizedChroma: 0.95,
      });
      usePaletteStore.getState().initialize('primary', initialColor);

      const result = usePaletteStore.getState();

      const colorId = result.colors[0].id;

      expect(() => {
        usePaletteStore
          .getState()
          .addColorToSet('non_existent_color_set_id', colorId);
      }).toThrow(colorSetNotFoundError('non_existent_color_set_id'));
    });
    it('throws an error if color is already in set', () => {
      const initialColor = new OkColor({
        hue: 120,
        lightness: 0.7,
        harmonizedChroma: 0.95,
      });
      usePaletteStore.getState().initialize('primary', initialColor);

      usePaletteStore.getState().addColorSet('test_set_1', 'default');

      const result = usePaletteStore.getState();

      const colorId = result.colors[0].id;
      const test_set_1_id = result.colorSets[0].id;

      usePaletteStore.getState().addColorToSet(test_set_1_id, colorId);

      expect(() => {
        usePaletteStore.getState().addColorToSet(test_set_1_id, colorId);
      }).toThrow(colorAlreadyInSetError(colorId, test_set_1_id));
    });
  });
  describe('removeColorFromSet', () => {
    it('removes a color from a color set', () => {
      const initialColor = new OkColor({
        hue: 120,
        lightness: 0.7,
        harmonizedChroma: 0.95,
      });
      usePaletteStore.getState().initialize('primary', initialColor);

      usePaletteStore.getState().addColorSet('test_set_1', 'default');
      usePaletteStore.getState().addColorSet('test_set_2', 'default');

      const result = usePaletteStore.getState();

      const colorId = result.colors[0].id;
      const test_set_1_id = result.colorSets[0].id;
      const test_set_2_id = result.colorSets[1].id;

      usePaletteStore.getState().addColorToSet(test_set_1_id, colorId);
      usePaletteStore.getState().addColorToSet(test_set_2_id, colorId);

      let updatedResult = usePaletteStore.getState();

      expect(updatedResult.colorSets[0].colorIds).toContain(colorId);

      usePaletteStore.getState().removeColorFromSet(test_set_1_id, colorId);

      updatedResult = usePaletteStore.getState();

      expect(updatedResult.colorSets[0].colorIds).not.toContain(colorId);
      expect(updatedResult.colorSets[1].colorIds).toContain(colorId);
    });
    it('throws an error if color set does not exist', () => {
      const initialColor = new OkColor({
        hue: 120,
        lightness: 0.7,
        harmonizedChroma: 0.95,
      });
      usePaletteStore.getState().initialize('primary', initialColor);

      const result = usePaletteStore.getState();

      const colorId = result.colors[0].id;

      expect(() => {
        usePaletteStore
          .getState()
          .removeColorFromSet('non_existent_color_set_id', colorId);
      }).toThrow(colorSetNotFoundError('non_existent_color_set_id'));
    });
    it('throws an error if color is not in set', () => {
      const initialColor = new OkColor({
        hue: 120,
        lightness: 0.7,
        harmonizedChroma: 0.95,
      });
      usePaletteStore.getState().initialize('primary', initialColor);

      usePaletteStore.getState().addColorSet('test_set_1', 'default');

      const result = usePaletteStore.getState();

      const colorId = result.colors[0].id;
      const test_set_1_id = result.colorSets[0].id;

      expect(() => {
        usePaletteStore.getState().removeColorFromSet(test_set_1_id, colorId);
      }).toThrow(colorNotInSetError(colorId, test_set_1_id));
    });
  });
});
