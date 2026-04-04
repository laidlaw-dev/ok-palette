import {
  asHue,
  generateAnalogousColors,
  generateComplementaryColors,
  isAngleEqual,
  type OkColor,
} from '@/domain/color';

export const colorHueMap = [
  { key: 'red', hue: asHue(15) },
  { key: 'orange', hue: asHue(45) },
  { key: 'yellow', hue: asHue(75) },
  { key: 'green', hue: asHue(135) },
  { key: 'cyan', hue: asHue(195) },
  { key: 'blue', hue: asHue(255) },
  { key: 'purple', hue: asHue(285) },
];

const complementaryKeys = [
  'complementary',
  'split',
  'triadic',
  'analogous',
] as const;

interface AvailableColorGroup {
  key: string;
  colors: OkColor[];
}

export const filterAvailableColors = (
  primary: OkColor,
  usedColors: OkColor[]
): AvailableColorGroup[] => {
  const complementaryColors = generateComplementaryColors(primary);

  const complementries = complementaryKeys.reduce((acc, key) => {
    const colors = complementaryColors[key];
    const availableColors = colors.filter(
      (color) => !usedColors.some((used) => isAngleEqual(used.hue, color.hue))
    );
    if (availableColors.length > 0) {
      acc.push({ key, colors: availableColors });
    }
    return acc;
  }, [] as AvailableColorGroup[]);

  // Add hues if any analogous colors are available for that hue
  const hues = colorHueMap.reduce((acc, color) => {
    const analogousColors = generateAnalogousColors(
      primary.copyWith({ hue: color.hue }),
      {
        angle: 15,
        count: 2,
      }
    );
    const availableColors = analogousColors.filter(
      (color) => !usedColors.some((used) => isAngleEqual(used.hue, color.hue))
    );
    return availableColors.length > 0
      ? [...acc, { key: color.key, colors: availableColors }]
      : acc;
  }, [] as AvailableColorGroup[]);

  return [...complementries, ...hues];
};
