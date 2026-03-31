import { formatHex, formatHex8, parse } from 'culori/fn';
import { invalidHexError } from './color-errors';
import { rgb } from 'culori/css';

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
