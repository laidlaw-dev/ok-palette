import {
  asChroma,
  asLightness,
  OkColor,
  type Chroma,
  type Lightness,
} from '@/domain/color';
import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { ColorSetType, PaletteCollection } from './palette-types';
import {
  colorAlreadyInSetError,
  colorNotFoundError,
  colorNotInSetError,
  colorSetNotFoundError,
} from './palette-errors';

type PaletteStore = PaletteCollection & {
  selectedPaletteId: string;
  initialize: (name: string, primaryColor: OkColor) => void;
  addColor: (name: string, color: OkColor) => void;
  removeColor: (colorId: string) => void;
  addColorSet: (name: string, type: ColorSetType) => void;
  removeColorSet: (colorSetId: string) => void;
  addColorToSet: (colorSetId: string, colorId: string) => void;
  removeColorFromSet: (colorSetId: string, colorId: string) => void;
  reset: () => void;
};

/**
 * Palette store using Zustand for managing color palettes and their related data.
 *
 * @returns {PaletteStore} The palette store object with state and actions
 *
 * @property {OkColor} primaryColor - The primary color of the palette
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
  primaryColor: OkColor.fromHex('#05b2e5'),
  colors: [],
  palettes: [],
  colorSets: [],
  selectedPaletteId: '',
  initialize: (name, primaryColor) => {
    const paletteId = nanoid();
    set({
      primaryColor: primaryColor.copyWith({}),
      colors: [
        {
          id: nanoid(),
          name: name,
          hue: primaryColor.hue,
        },
      ],
      palettes: [
        {
          id: paletteId,
          name: undefined,
          baseLightness: primaryColor.lightness,
          baseChroma: primaryColor.harmonizedChroma,
          colorSetValues: [],
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
  removeColor: (colorId) => {
    set((state) => {
      if (!state.colors.some((color) => color.id === colorId))
        throw new Error(colorNotFoundError(colorId));
      return {
        colors: state.colors.filter((color) => color.id !== colorId),
        colorSets: state.colorSets.map((colorSet) => ({
          ...colorSet,
          colorIds: colorSet.colorIds.filter((id) => id !== colorId),
        })),
      };
    });
  },
  addColorSet: (name, type) => {
    set((state) => {
      const id = nanoid();
      const newColorSet = {
        id: id,
        name,
        colorIds: [],
      };
      return {
        colorSets: [...state.colorSets, newColorSet],
        palettes: state.palettes.map((palette) => ({
          ...palette,
          colorSetValues: [
            ...palette.colorSetValues,
            {
              colorSetId: id,
              ...getDefaultColorSetValues(
                type,
                state.primaryColor.lightness,
                state.primaryColor.harmonizedChroma
              ),
            },
          ],
        })),
      };
    });
  },
  removeColorSet: (colorSetId) => {
    set((state) => {
      if (!state.colorSets.some((set) => set.id === colorSetId))
        throw new Error(colorSetNotFoundError(colorSetId));
      return {
        colorSets: state.colorSets.filter((set) => set.id !== colorSetId),
        palettes: state.palettes.map((palette) => ({
          ...palette,
          colorSetValues: palette.colorSetValues.filter(
            (value) => value.colorSetId !== colorSetId
          ),
        })),
      };
    });
  },
  addColorToSet: (colorSetId, colorId) => {
    set((state) => {
      const colorExists = state.colors.some((color) => color.id === colorId);
      if (!colorExists) throw new Error(colorNotFoundError(colorId));
      const colorSet = state.colorSets.find((set) => set.id === colorSetId);
      if (!colorSet) throw new Error(colorSetNotFoundError(colorSetId));
      if (colorSet.colorIds.includes(colorId))
        throw new Error(colorAlreadyInSetError(colorId, colorSetId));
      if (!colorExists) return state;
      return {
        colorSets: state.colorSets.map((colorSet) =>
          colorSet.id === colorSetId
            ? { ...colorSet, colorIds: [...colorSet.colorIds, colorId] }
            : colorSet
        ),
      };
    });
  },
  removeColorFromSet: (colorSetId, colorId) => {
    set((state) => {
      const colorSet = state.colorSets.find((set) => set.id === colorSetId);
      if (!colorSet) throw new Error(colorSetNotFoundError(colorSetId));
      if (!colorSet.colorIds.includes(colorId))
        throw new Error(colorNotInSetError(colorId, colorSetId));
      return {
        colorSets: state.colorSets.map((colorSet) =>
          colorSet.id === colorSetId
            ? {
                ...colorSet,
                colorIds: colorSet.colorIds.filter((id) => id !== colorId),
              }
            : colorSet
        ),
      };
    });
  },
  reset: () => {
    set(store.getInitialState());
  },
}));

const getDefaultColorSetValues = (
  type: ColorSetType,
  defaultLightness: Lightness,
  defaultChroma: Chroma
): { lightness: Lightness; chroma: Chroma } => {
  switch (type) {
    case 'surface':
      return { lightness: asLightness(0.9), chroma: defaultChroma };
    case 'text':
      return { lightness: asLightness(0.1), chroma: asChroma(0.1) };
    case 'border':
      return {
        lightness: asLightness(defaultLightness - 0.1),
        chroma: defaultChroma,
      };
    case 'default':
    default:
      return { lightness: defaultLightness, chroma: defaultChroma };
  }
};
