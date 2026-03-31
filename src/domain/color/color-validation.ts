import { parse } from 'culori/fn';

//  Required for parse function
import { rgb as _rgb } from 'culori/css';

export const isValidOpaqueHex = (hex: string): boolean => {
  const trimmedHex = hex.trim();

  if (trimmedHex === '') {
    return false;
  }

  const rgbColor = parse(trimmedHex);
  return rgbColor !== undefined && rgbColor.alpha === undefined;
};
