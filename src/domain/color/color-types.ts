export type Normalized = number & { readonly __brand: 'Normalized' };
export type Angle = number & { readonly __brand: 'Angle' };

export type Lightness = Normalized;
export type Chroma = Normalized;
// Hue is represented as an angle in degrees, normalized to [0, 359], or undefined for achromatic colors
export type Hue = Angle | undefined;
export type Alpha = Normalized;

export interface OkRGB {
  r: number;
  g: number;
  b: number;
}
