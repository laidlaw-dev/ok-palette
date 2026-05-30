import { OkColor } from '../../domain/color';
import type {
  GeneratedColorSet,
  Palette,
  PaletteColor,
  PaletteColorSet,
} from './palette-types';

type GeneratedPaletteColors = {
  allColors: {
    id: string;
    name: string;
    color: OkColor;
  }[];
  colorSets: GeneratedColorSet[];
};

/**
 * Generates palette colors by creating OkColor instances with specified lightness, chroma, and hue values.
 *
 * @param {Object} params - The parameters object
 * @param {Palette} [params.palette] - The palette configuration containing default lightness and chroma values
 * @param {PaletteColorSet[]} params.colorSets - Array of color sets with their own lightness and chroma values
 * @param {PaletteColor[]} params.allColors - Array of all available colors with id, name, and hue
 *
 * @returns {GeneratedPaletteColors} An object containing:
 *   - `allColors`: Array of generated colors using palette defaults
 *   - `colorSets`: Array of color sets with their generated colors
 *
 * @remarks
 * If palette is undefined, returns empty allColors and colorSets arrays.
 * Colors included in a colorSet are generated with that set's lightness and chroma values.
 * Colors not included in a colorSet only have id and name properties.
 */
export const generatePaletteColors = ({
  palette,
  colorSets,
  allColors,
}: {
  palette?: Palette;
  colorSets: PaletteColorSet[];
  allColors: PaletteColor[];
}): GeneratedPaletteColors => {
  if (palette === undefined) {
    return {
      allColors: [],
      colorSets: [],
    };
  }
  // All colors
  const allGeneratedColors = allColors.map((color) => ({
    id: color.id,
    name: color.name,
    color: new OkColor({
      lightness: palette.baseLightness,
      harmonizedChroma: palette.baseChroma,
      hue: color.hue,
    }),
  }));
  // Color sets
  const generatedColorSets = colorSets.map((colorSet) => {
    const paletteColorSet = palette.colorSetValues.find(
      (colorSetValue) => colorSetValue.colorSetId === colorSet.id
    );
    if (!paletteColorSet) return undefined;
    const colors = allColors.map((color) => {
      return {
        id: color.id,
        name: color.name,
        color: new OkColor({
          lightness: paletteColorSet.lightness,
          harmonizedChroma: paletteColorSet.chroma,
          hue: color.hue,
        }),
        isInSet: colorSet.colorIds.includes(color.id),
      };
    });
    return {
      id: colorSet.id,
      name: colorSet.name,
      lightness: paletteColorSet.lightness,
      chroma: paletteColorSet.chroma,
      colors,
    };
  });

  return {
    colorSets: generatedColorSets.filter((set) => set !== undefined),
    allColors: allGeneratedColors,
  };
};
