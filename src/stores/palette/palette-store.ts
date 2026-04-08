import type { OkColor } from '@/domain/color';
import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { PaletteCollection } from './palette-types';

type PaletteStore = PaletteCollection & {
  selectedPaletteId: string;
  initialize: (primaryColor: OkColor) => void;
  addColor: (name: string, color: OkColor) => void;
  reset: () => void;
};

/**
 * Palette store using Zustand for managing color palettes and their related data.
 *
 * @returns {PaletteStore} The palette store object with state and actions
 *
 * @property {Color[]} colors - Array of color objects in the store
 * @property {Palette[]} palettes - Array of palette objects
 * @property {ColorSet[]} colorSets - Array of color set objects
 * @property {string} selectedPaletteId - ID of the currently selected palette
 *
 * @method initialize - Initializes the store with a new palette and color
 * @param {Object} primaryColor - The primary color object containing hue, lightness, and harmonizedChroma
 *
 * @method reset - Resets the store to its initial state
 */
export const usePaletteStore = create<PaletteStore>((set, _get, store) => ({
  colors: [],
  palettes: [],
  colorSets: [],
  selectedPaletteId: '',
  initialize: (primaryColor) => {
    const paletteId = nanoid();
    set({
      colors: [
        {
          id: nanoid(),
          name: undefined,
          hue: primaryColor.hue,
        },
      ],
      palettes: [
        {
          id: paletteId,
          name: undefined,
          defaultLightness: primaryColor.lightness,
          defaultChroma: primaryColor.harmonizedChroma,
          colorSetIds: [],
        },
      ],
      colorSets: [],
      selectedPaletteId: paletteId,
    });
  },
  addColor: (name, color) => {
    set((state) => {
      const newColor = { id: nanoid(), name, hue: color.hue };
      return { colors: [...state.colors, newColor] };
    });
  },
  reset: () => {
    set(store.getInitialState());
  },
}));
