import {
  ANGLE_TOLERANCE,
  NORMALIZED_TOLERANCE,
  OPAQUE,
} from './color-constants';
import type {
  Alpha,
  Angle,
  Chroma,
  Hue,
  Lightness,
  Normalized,
} from './color-types';

export function asNormalized(value: number): Normalized;
export function asNormalized(value: number | undefined): Normalized | undefined;
/**
 * Normalizes a numeric value to the range [0, 1].
 *
 * @param value - The number to normalize, or undefined
 * @returns The normalized value clamped between 0 and 1, or undefined if input is undefined
 */
export function asNormalized(
  value: number | undefined
): Normalized | undefined {
  if (value === undefined) {
    return undefined;
  }
  return Math.min(Math.max(value, 0), 1) as Normalized;
}

/**
 * Converts a numeric value to a normalized angle in the range [0, 359].
 *
 * @param value - The angle value to normalize. Can be any number or undefined.
 *                Undefined values are treated as 0.
 * @returns An angle normalized to the range [0, 359] degrees.
 *
 * @example
 * asAngle(450)    // Returns 90
 * asAngle(-90)    // Returns 270
 * asAngle(45)     // Returns 45
 * asAngle(undefined) // Returns 0
 */
export const asAngle = (value: number | undefined): Angle => {
  if (value === undefined) return 0 as Angle;
  if (value < 0)
    return (value + Math.ceil(Math.abs(value) / 360) * 360) as Angle;
  if (value > 359) return (value - Math.floor(value / 360) * 360) as Angle;
  return value as Angle;
};

/**
 * Converts a numeric value to a normalized Lightness value.
 * @param value - The numeric value to convert to Lightness, should be a valid normalized value
 * @returns A Lightness value representing the normalized input
 */
export const asLightness = (value: number): Lightness => asNormalized(value);

/**
 * Converts a numeric value to a Chroma value using normalization.
 * @param value - The numeric value to convert to Chroma format
 * @returns The normalized value as a Chroma type
 */
export const asChroma = (value: number): Chroma => asNormalized(value);

/**
 * Converts a numeric value to a Hue value using angle normalization.
 * @param value - The numeric value to convert to Hue format
 * @returns The normalized value as a Hue type
 */
export const asHue = (value: number | undefined): Hue => asAngle(value);

/**
 * Converts a numeric value to an Alpha value using normalization.
 * @param value - The numeric value to convert to Alpha format
 * @returns The normalized value as an Alpha type, or `OPAQUE` if input is undefined
 */
export const asAlpha = (value: number | undefined): Alpha => {
  if (value === undefined) {
    return OPAQUE as Alpha; // Default to fully opaque if alpha is undefined
  }
  return asNormalized(value) as Alpha;
};

/**
 * Compares two numbers for equality within a specified tolerance, treating undefined values as equal.
 *
 * @param a A number that may be outside the range of 0 to 1, or undefined.
 * @param b A number that may be outside the range of 0 to 1, or undefined.
 * @returns A boolean indicating whether the two numbers are equal within the specified tolerance.
 */
export const isNormalizedEqual = (
  a: number | undefined,
  b: number | undefined
) => {
  const normalizedA = asNormalized(a);
  const normalizedB = asNormalized(b);

  if (normalizedA === undefined && normalizedB === undefined) {
    return true;
  }
  if (normalizedA === undefined || normalizedB === undefined) {
    return false;
  }

  return Math.abs(normalizedA - normalizedB) <= NORMALIZED_TOLERANCE;
};

/**
 * Compares two angles for equality within a specified tolerance, treating undefined values as equal.
 *
 * @param a A number that may be outside the range of 0 to 359, or undefined.
 * @param b A number that may be outside the range of 0 to 359, or undefined.
 * @returns A boolean indicating whether the two angles are equal within the specified tolerance.
 */
export const isAngleEqual = (a: number | undefined, b: number | undefined) => {
  if (a === undefined && b === undefined) {
    return true;
  }
  if (a === undefined || b === undefined) {
    return false;
  }

  const normalizedA = asAngle(a);
  const normalizedB = asAngle(b);

  const diff = Math.abs(normalizedA - normalizedB);
  const wrappedDiff = Math.min(diff, 360 - diff);

  return wrappedDiff <= ANGLE_TOLERANCE;
};
