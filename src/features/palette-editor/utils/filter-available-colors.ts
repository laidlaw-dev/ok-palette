import {
  asHue,
  generateSpectrum,
  generateComplementaryColors,
  isAngleEqual,
  type OkColor,
} from '@/domain/color';

export const HUE_ANGLE = 9;
export const HUE_COUNT = 3;

export const colorHueMap = [
  { key: 'red', hue: asHue(15) },
  { key: 'yellow', hue: asHue(75) },
  { key: 'green', hue: asHue(135) },
  { key: 'cyan', hue: asHue(195) },
  { key: 'blue', hue: asHue(255) },
  { key: 'purple', hue: asHue(315) },
];

const complementaryKeys = [
  'complementary',
  'split',
  'triadic',
  'achromatic',
  'analogous',
] as const;

export interface AvailableColorGroup {
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
    const analogousColors = generateSpectrum(
      primary.copyWith({ hue: color.hue }),
      {
        angle: HUE_ANGLE,
        count: HUE_COUNT,
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
