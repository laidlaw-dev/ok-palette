import type { OkColor } from '@/domain/color';
import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { PaletteCollection } from './palette-types';

type PaletteStore = PaletteCollection & {
  selectedPaletteId: string;
  initialize: ({
    initalColor,
    paletteName,
    colorName,
  }: {
    initalColor: OkColor;
    paletteName: string;
    colorName: string;
  }) => void;
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
 * @param {Object} options - Initialization options
 * @param {Object} options.initalColor - The initial color object containing hue, lightness, and harmonizedChroma
 * @param {string} options.paletteName - Name for the new palette
 * @param {string} options.colorName - Name for the initial color
 * 
 * @method reset - Resets the store to its initial state
 */
export const usePaletteStore = create<PaletteStore>((set, _get, store) => ({
  colors: [],
  palettes: [],
  colorSets: [],
  selectedPaletteId: '',
  initialize: ({ initalColor, paletteName, colorName }) => {
    const paletteId = nanoid();
    set({
      colors: [
        {
          id: nanoid(),
          name: colorName,
          hue: initalColor.hue,
        },
      ],
      palettes: [
        {
          id: paletteId,
          name: paletteName,
          defaultLightness: initalColor.lightness,
          defaultChroma: initalColor.harmonizedChroma,
          colorSetIds: [],
        },
      ],
      colorSets: [],
      selectedPaletteId: paletteId,
    });
  },
  reset: () => {
    set(store.getInitialState());
  },
}));
