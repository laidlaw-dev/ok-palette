import type { Chroma, Hue, Lightness, OkColor } from '../../domain/color';

export type PaletteColor = {
  id: string;
  name: string;
  hue: Hue;
};

export type ColorSetType = 'default' | 'surface' | 'text' | 'border';

export type PaletteColorSet = {
  id: string;
  name: string;
  colorIds: string[];
};

export type ColorSetValues = {
  colorSetId: string;
  lightness: Lightness;
  chroma: Chroma;
};

export type Palette = {
  id: string;
  name?: string;
  baseLightness: Lightness;
  baseChroma: Chroma;
  colorSetValues: ColorSetValues[];
};

export type PaletteCollection = {
  primaryColor: OkColor;
  colors: PaletteColor[];
  colorSets: PaletteColorSet[];
  palettes: Palette[];
};

export type GeneratedColorSet = {
  id: string;
  name: string;
  lightness: Lightness;
  chroma: Chroma;
  colors: {
    id: string;
    name: string;
    color: OkColor;
    isInSet: boolean;
  }[];
};
