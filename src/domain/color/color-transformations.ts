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

  return slots.map((slot) => color.copyWith({ hue: color.hue + slot * angle }));
};

export const generateComplementaryColors = (color: OkColor) => {
  return {
    complementary: [color.copyWith({ hue: color.hue + 180 })],
    split: [
      color.copyWith({ hue: color.hue - 150 }),
      color.copyWith({ hue: color.hue + 150 }),
    ],
    triadic: [
      color.copyWith({ hue: color.hue - 120 }),
      color.copyWith({ hue: color.hue + 120 }),
    ],
    analogous: generateAnalogousColors(color, { angle: 15, count: 2 }),
  };
};
