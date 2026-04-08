import { OkColor, type Chroma, type Lightness } from '../../domain/color';
import type { Palette, PaletteColor, PaletteColorSet } from './palette-types';

type GeneratedPaletteColors = {
  allColors: {
    id: string;
    name: string;
    color: OkColor;
  }[];
  colorSets: {
    lightness: Lightness;
    chroma: Chroma;
    colors: {
      id: string;
      name?: string;
      color?: OkColor;
    }[];
  }[];
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
      lightness: palette.defaultLightness,
      harmonizedChroma: palette.defaultChroma,
      hue: color.hue,
    }),
  }));
  // Color sets
  const generatedColorSets = colorSets.map((colorSet) => {
    const colors = allColors.map((color) => {
      if (colorSet.colorIds.includes(color.id)) {
        return {
          id: color.id,
          name: color.name,
          color: new OkColor({
            lightness: colorSet.lightness,
            harmonizedChroma: colorSet.chroma,
            hue: color.hue,
          }),
        };
      }
      return {
        id: color.id,
        name: color.name,
      };
    });
    return {
      lightness: colorSet.lightness,
      chroma: colorSet.chroma,
      colors,
    };
  });

  return {
    colorSets: generatedColorSets,
    allColors: allGeneratedColors,
  };
};
