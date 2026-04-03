export type Normalized = number & { readonly __brand: 'Normalized' };
export type Angle = number & { readonly __brand: 'Angle' };

export type Lightness = Normalized;
export type Chroma = Normalized;
export type Hue = Angle;
export type Alpha = Normalized;

export interface OkRGB {
  r: number;
  g: number;
  b: number;
}
