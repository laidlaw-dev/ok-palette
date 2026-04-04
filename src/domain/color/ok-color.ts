import { formatCss, formatHex, parse } from 'culori/fn';
import { oklch, rgb } from 'culori';
import type { Alpha, Chroma, Hue, Lightness } from './color-types';
import { calculateChroma, calculateMaxChroma } from './calculate-chroma';
import {
  asAlpha,
  asChroma,
  asHue,
  asLightness,
  asNormalized,
  isAngleEqual,
  isNormalizedEqual,
} from './color-type-utilities';
import { invalidHexError } from './color-errors';
import { isValidHex } from './color-validation';

type OkColorChromaConstructor = {
  lightness: number;
  chroma: number;
  hue: number;
  alpha?: number;
};

type BrandedOkColorChromaConstructor = OkColorChromaConstructor & {
  readonly __brand: 'OkColorChromaConstructor';
};

type OkColorHarmonizedChromaConstructor = {
  lightness: number;
  harmonizedChroma: number;
  hue: number;
  alpha?: number;
};

type OkColorConstructor =
  | BrandedOkColorChromaConstructor
  | OkColorHarmonizedChromaConstructor;

// The chroma constructor should only be used internally when creating OkColor instances
// from hex or RGB inputs, to save recalculating max chroma. The type is branded to
// prevent accidental external usage.
export const asOkColorChromaConstructor = (
  params: OkColorChromaConstructor
): BrandedOkColorChromaConstructor => {
  return { ...params, __brand: 'OkColorChromaConstructor' };
};

/**
 * Represents a color in the OKLCH color space with support for harmonic chroma normalization.
 *
 * @remarks
 * The `OkColor` class encapsulates color data in the OKLCH color model, which separates
 * color into lightness, chroma, and hue components. It provides:
 * - Normalization and validation of color channels through domain coercion helpers
 * - Automatic clamping of chroma values to valid ranges based on lightness and hue
 * - Harmonic chroma tracking for perceptually consistent color transitions
 * - Conversion to RGB and hexadecimal color formats
 * - Static factory methods for creating `OkColor` instances from hex strings and RGB values
 *
 */
export class OkColor {
  #lightness: Lightness;
  #chroma: Chroma;
  #harmonizedChroma: Chroma;
  #hue: Hue;
  #alpha: Alpha;

  get lightness() {
    return this.#lightness;
  }

  get chroma() {
    return this.#chroma;
  }

  get hue() {
    return this.#hue;
  }

  get alpha() {
    return this.#alpha;
  }

  get harmonizedChroma() {
    return this.#harmonizedChroma;
  }

  /**
   * Creates an `OkColor` instance from validated constructor parameters and normalizes
   * chroma-related fields based on the provided input shape.
   *
   * @remarks
   * - `lightness`, `hue`, and `alpha` are always normalized via their corresponding
   *   domain coercion helpers.
   * - If `harmonizedChroma` is provided, absolute `chroma` is derived from
   *   `lightness`, `harmonizedChroma`, and `hue`.
   * - If `harmonizedChroma` is not provided, `chroma` is clamped to the maximum
   *   chroma allowed for the given `lightness`/`hue`, and `harmonizedChroma` is
   *   computed from that clamped value.
   * - When the computed maximum chroma is `0`, `harmonizedChroma` is set to `1`
   *   to avoid division by zero.
   *
   * @param params - Constructor input containing color channels and either:
   * - a `harmonizedChroma` value (from which `chroma` is computed), or
   * - a `chroma` value (from which `harmonizedChroma` is computed after clamping).
   */
  constructor(params: OkColorConstructor) {
    this.#lightness = asLightness(params.lightness);

    this.#hue = asHue(params.hue);
    this.#alpha = asAlpha(params.alpha);

    if ('harmonizedChroma' in params) {
      this.#harmonizedChroma = asChroma(params.harmonizedChroma);
      this.#chroma = calculateChroma(
        this.#lightness,
        this.#harmonizedChroma,
        this.#hue
      );
    } else {
      const maxChroma = calculateMaxChroma(this.#lightness, this.#hue);
      this.#chroma = asChroma(Math.min(params.chroma, maxChroma));
      this.#harmonizedChroma = asChroma(
        maxChroma === 0 ? 1 : this.#chroma / maxChroma
      );
    }
  }

  /**
   * Creates a new `OkColor` instance by copying the current color and selectively overriding
   * any provided properties.
   *
   * Any field omitted in `params` retains its value from the current instance.
   *
   * @param params - A partial set of color properties to override on the copied instance.
   * @returns A new `OkColor` with merged values from the current instance and `params`.
   */
  copyWith(params: Partial<OkColorHarmonizedChromaConstructor>) {
    return new OkColor({
      lightness: params.lightness ?? this.#lightness,
      harmonizedChroma: params.harmonizedChroma ?? this.#harmonizedChroma,
      hue: params.hue ?? this.#hue,
      alpha: params.alpha ?? this.#alpha,
    });
  }

  /**
   * Compares the current OkColor instance with another OkColor instance for equality.
   * Two OkColor instances are considered equal if their lightness, harmonized chroma, hue, and alpha values are all equal.
   *
   * @param other - Another OkColor instance to compare with the current instance for equality.
   * @returns
   */
  equals(other: OkColor) {
    return (
      isNormalizedEqual(this.#lightness, other.lightness) &&
      isNormalizedEqual(this.#harmonizedChroma, other.harmonizedChroma) &&
      isAngleEqual(this.#hue, other.hue) &&
      isNormalizedEqual(this.#alpha, other.alpha)
    );
  }

  /**
   * Gets the CSS string representation of the color.
   * Converts the color from OKLCh color space to RGB and formats it as a CSS color string.
   *
   * @returns {string} A CSS color string in RGB format. If the alpha value is less than 1.0,
   * it will be included in the output to represent transparency; otherwise, it is omitted.
   *
   */
  get css() {
    return formatCss(
      rgb(
        oklch({
          mode: 'oklch',
          l: this.#lightness,
          c: this.#chroma,
          h: this.hue,
          alpha: this.#alpha < 1.0 ? this.#alpha : undefined,
        })
      )
    );
  }

  /**
   * Returns the hexadecimal string representation of the color.
   * The method converts the OKLCH color to RGB format and then formats it as a hexadecimal string.
   * If the alpha value is less than 1.0, it includes the alpha component in the output.
   *
   * @returns A string representing the color in hexadecimal format.
   */
  get hex() {
    return formatHex(
      oklch({
        mode: 'oklch',
        l: this.#lightness,
        c: this.#chroma,
        h: this.#hue,
        alpha: this.#alpha < 1.0 ? this.#alpha : undefined,
      })
    ).toLowerCase();
  }

  /**
   * Gets the RGB color values converted from the current OKLCH color space.
   * @returns {Object} An object containing the RGB color components and alpha value.
   * @returns {number} returns.r - The red component (0-255).
   * @returns {number} returns.g - The green component (0-255).
   * @returns {number} returns.b - The blue component (0-255).
   * @returns {number|undefined} returns.alpha - The alpha (opacity) value, or undefined if fully opaque.
   */
  get rgb() {
    const rgbColor = rgb(
      oklch({
        mode: 'oklch',
        l: this.#lightness,
        c: this.#chroma,
        h: this.#hue,
        alpha: this.#alpha < 1.0 ? this.#alpha : undefined,
      })
    );
    return {
      r: rgbColor.r,
      g: rgbColor.g,
      b: rgbColor.b,
      alpha: rgbColor.alpha,
    };
  }

  /**
   * Creates an OkColor instance from a hexadecimal color string.
   * @param hex - The hexadecimal color string to parse (e.g., "#FF0000" or "FF0000").
   * @returns An OkColor instance with lightness, chroma, hue, and alpha values derived from the hex string.
   * @throws {Error} If the hex string is invalid or cannot be parsed as an RGB color.
   */
  static fromHex(hex: string): OkColor {
    if (!isValidHex(hex)) {
      throw new Error(invalidHexError(hex));
    }

    const trimmedHex = hex.trim();

    const rgb = parse(trimmedHex);
    if (!rgb || rgb.mode !== 'rgb') {
      throw new Error(invalidHexError(trimmedHex));
    }
    const oklchColor = oklch(rgb);
    return new OkColor(
      asOkColorChromaConstructor({
        lightness: oklchColor.l,
        chroma: oklchColor.c,
        hue: asHue(oklchColor.h),
        alpha: rgb.alpha,
      })
    );
  }

  /**
   * Creates an OkColor instance from RGB color values.
   * @param color - The RGB color object
   * @param color.r - The red channel value (0-255 or 0-1)
   * @param color.g - The green channel value (0-255 or 0-1)
   * @param color.b - The blue channel value (0-255 or 0-1)
   * @param color.alpha - Optional alpha channel value (0-1)
   * @returns An OkColor instance with converted OKLch color space values
   */
  static fromRgb = (color: {
    r: number;
    g: number;
    b: number;
    alpha?: number;
  }): OkColor => {
    const oklchColor = oklch({
      mode: 'rgb',
      r: asNormalized(color.r) ?? 0,
      g: asNormalized(color.g) ?? 0,
      b: asNormalized(color.b) ?? 0,
    });
    return new OkColor(
      asOkColorChromaConstructor({
        lightness: oklchColor.l,
        chroma: oklchColor.c,
        hue: asHue(oklchColor.h),
        alpha: color.alpha,
      })
    );
  };
}
