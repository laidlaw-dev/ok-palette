import { ACHROMATIC } from './color-constants';
import type { OkColor } from './ok-color';

export const generateAnalogousColors = (
  color: OkColor,
  options?: { angle?: number; count?: number }
): OkColor[] => {
  const angle =
    options?.angle != null ? Math.min(Math.max(options.angle, 1), 30) : 30;
  const count =
    options?.count != null ? Math.min(Math.max(options.count, 1), 3) : 1;

  const slots = Array.from({ length: count * 2 }, (_, i) =>
    i < count ? i - count : i - count + 1
  );

  return slots.map((slot) => color.copyWithRotation(slot * angle));
};

export const generateComplementaryColors = (color: OkColor) => {
  return {
    complementary: [color.copyWithRotation(180)],
    split: [color.copyWithRotation(-150), color.copyWithRotation(150)],
    triadic: [color.copyWithRotation(-120), color.copyWithRotation(120)],
    achromatic: [color.copyWith({ hue: ACHROMATIC })],
    analogous: generateAnalogousColors(color, { angle: 15, count: 2 }),
  };
};
