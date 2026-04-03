import { oklch } from 'culori/css';
import { inGamut } from 'culori/fn';
import { asChroma } from './color-type-utilities';
import type { Chroma, Hue, Lightness } from './color-types';
import { NORMALIZED_TOLERANCE } from './color-constants';

const MAX_CHROMA = asChroma(0.5);
const inRgb = inGamut('rgb');

/**
 * Calculates the maximum chroma for a given lightness and hue.
 * The maximum chroma is determined by testing colors within the RGB gamut.
 *
 * @param lightness - The lightness value (0 to 1) for which to calculate maximum chroma.
 * @param hue - The hue value (0 to 360) that affects the maximum chroma.
 * @returns The maximum chroma value as a Chroma type.
 */
export const calculateMaxChroma = (lightness: Lightness, hue: Hue): Chroma => {
  if (lightness === 0 || lightness === 1) return 0 as Chroma;
  return testColor(lightness, hue, asChroma(0), MAX_CHROMA);
};

const testColor = (
  lightness: Lightness,
  hue: Hue,
  lowChroma: Chroma,
  highChroma: Chroma
): Chroma => {
  if (highChroma - lowChroma < NORMALIZED_TOLERANCE) {
    return lowChroma;
  }
  const midChroma = asChroma((lowChroma + highChroma) / 2);
  const color = oklch({ mode: 'oklch', l: lightness, c: midChroma, h: hue });
  if (inRgb(color)) {
    return testColor(lightness, hue, midChroma, highChroma);
  }
  return testColor(lightness, hue, lowChroma, midChroma);
};

/**
 * Calculates the chroma for a given lightness, harmonized chroma, and hue.
 * The chroma is adjusted based on the maximum chroma for the given lightness and hue,
 * and is further reduced as the lightness approaches 85% to prevent oversaturation.
 *
 * @param lightness - The lightness value (0 to 1) for which to calculate chroma.
 * @param harmonizedChroma - The harmonized chroma value (0 to 1) that influences the final chroma.
 * @param hue - The hue value (0 to 360) that affects the maximum chroma.
 * @returns The calculated chroma value as a Chroma type.
 */
export const calculateChroma = (
  lightness: Lightness,
  harmonizedChroma: Chroma,
  hue: Hue
) => {
  const maxChroma = calculateMaxChroma(lightness, hue);
  if (maxChroma === 0) return asChroma(0);

  return (maxChroma * harmonizedChroma * chromaRollOff(lightness)) as Chroma;
};

const chromaRollOff = (lightness: Lightness): number => {
  const delta = (lightness - 0.85) / (1 - 0.85);
  const t = Math.min(Math.max(delta, 0), 1);
  return 1 - t * t * (3 - 2 * t); // Smoothstep function
};
