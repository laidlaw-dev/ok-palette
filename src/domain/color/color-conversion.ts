import { formatHex, formatHex8, parse } from 'culori/fn';
import { invalidHexError } from './color-errors';
import { rgb } from 'culori/css';

/**
 * Converts a hexadecimal color string to an RGB color object.
 * @param hex - The hexadecimal color string to convert (e.g., "#FF5733" or "FF5733")
 * @returns An object containing the red, green, blue, and alpha channel values
 * @returns {number} returns.r - The red channel value (0-1)
 * @returns {number} returns.g - The green channel value (0-1)
 * @returns {number} returns.b - The blue channel value (0-1)
 * @returns {number} [returns.alpha] - The alpha channel value (0-1), optional
 * @throws {Error} Throws an error if the hex string is invalid or cannot be parsed to RGB mode
 */
export const hexToRgb = (hex: string) => {
  const rgbColor = parse(hex.trim());
  if (
    !rgbColor ||
    rgbColor.mode !== 'rgb' ||
    rgbColor.r === undefined ||
    rgbColor.g === undefined ||
    rgbColor.b === undefined
  ) {
    throw Error(invalidHexError(hex));
  }

  return { r: rgbColor.r, g: rgbColor.g, b: rgbColor.b, alpha: rgbColor.alpha };
};

/**
 * Converts an RGB color object to its hexadecimal string representation.
 * @param color - The RGB color object to convert.
 * @param color.r - The red channel value (0-1).
 * @param color.g - The green channel value (0-1).
 * @param color.b - The blue channel value (0-1).
 * @param color.alpha - Optional alpha channel value (0-1).
 * @returns The hexadecimal color string in lowercase format (#RRGGBB or #RRGGBBAA if alpha is provided).
 */
export const rgbToHex = (color: {
  r: number;
  g: number;
  b: number;
  alpha?: number;
}) => {
  const formatFunc = color.alpha !== undefined ? formatHex8 : formatHex;

  return formatFunc(
    rgb({
      mode: 'rgb',
      r: color.r ?? 0,
      g: color.g ?? 0,
      b: color.b ?? 0,
      alpha: color.alpha,
    })
  ).toLowerCase();
};
