import { ACHROMATIC } from './color-constants';
import type { OkColor } from './ok-color';

export const generateSpectrum = (
  color: OkColor,
  options?: { angle?: number; count?: number }
): OkColor[] => {
  const angle =
    options?.angle != null ? Math.min(Math.max(options.angle, 1), 30) : 30;
  const count =
    options?.count != null ? Math.min(Math.max(options.count, 1), 3) : 1;

  const slots = Array.from(
    { length: count * 2 + 1 },
    (_, i) => (i = i - count)
  );

  return slots.map((slot) => color.copyWithRotation(slot * angle));
};

export const generateComplementaryColors = (color: OkColor) => {
  const analogousSlots = [-2, -1, 1, 2];
  const analogousColors = analogousSlots.map((slot) =>
    color.copyWithRotation(slot * 15)
  );

  return {
    primary: [color.copyWith({})],
    complementary: [color.copyWithRotation(180)],
    split: [color.copyWithRotation(-150), color.copyWithRotation(150)],
    triadic: [color.copyWithRotation(-120), color.copyWithRotation(120)],
    achromatic: [color.copyWith({ hue: ACHROMATIC })],
    analogous: analogousColors,
  };
};
