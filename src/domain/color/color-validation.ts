import { parse } from 'culori/fn';

//  Required for parse function
import { rgb as _rgb } from 'culori/css';

/**
 * Validates whether a string represents a valid opaque hexadecimal color.
 *
 * An opaque hex color must be a valid hex color string without an alpha channel.
 * Empty strings are considered invalid.
 *
 * @param hex - The hex color string to validate, with optional whitespace
 * @returns `true` if the hex string is a valid opaque color, `false` otherwise
 *
 * @example
 * isValidOpaqueHex('#fff') // true
 * isValidOpaqueHex('#ffffff') // true
 * isValidOpaqueHex('#ffffff80') // false (has alpha channel)
 * isValidOpaqueHex('') // false (empty string)
 * isValidOpaqueHex('not-a-color') // false (invalid format)
 */
export const isValidOpaqueHex = (hex: string): boolean => {
  const trimmedHex = hex.trim();

  if (trimmedHex === '') {
    return false;
  }

  const rgbColor = parse(trimmedHex);
  return rgbColor !== undefined && rgbColor.alpha === undefined;
};

/**
 * Validates whether a string is a valid hexadecimal color.
 * @param hex - The hexadecimal color string to validate.
 * @returns `true` if the hex string is a valid color, `false` otherwise.
 * @example
 * isValidHex('#FF0000') // returns true
 * isValidHex('invalid') // returns false
 * isValidHex('') // returns false
 */
export const isValidHex = (hex: string): boolean => {
  const trimmedHex = hex.trim();

  if (trimmedHex === '') {
    return false;
  }

  const rgbColor = parse(trimmedHex);
  return rgbColor !== undefined;
};
