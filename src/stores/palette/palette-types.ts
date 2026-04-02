import type { Chroma, Hue, Lightness } from '../../domain/color';

export type PaletteColor = {
  id: string;
  name: string;
  hue: Hue;
};

export type PaletteColorSet = {
  id: string;
  name: string;
  lightness: Lightness;
  chroma: Chroma;
  colorIds: string[];
};

export type Palette = {
  id: string;
  name: string;
  defaultLightness: Lightness;
  defaultChroma: Chroma;
  colorSetIds: string[];
};

export type PaletteCollection = {
  colors: PaletteColor[];
  colorSets: PaletteColorSet[];
  palettes: Palette[];
};
