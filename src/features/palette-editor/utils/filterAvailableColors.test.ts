import {
  generateAnalogousColors,
  generateComplementaryColors,
  OkColor,
} from '@/domain/color';
import { colorHueMap, filterAvailableColors } from './filterAvailableColors';

const primary = new OkColor({
  lightness: 0.5,
  harmonizedChroma: 0.5,
  hue: 180,
});

describe('filterAvailableColors', () => {
  it('adds complementary when complementary is available', () => {
    const expectedComplementary =
      generateComplementaryColors(primary).complementary[0];

    const usedColors: OkColor[] = [primary];

    const result = filterAvailableColors(primary, usedColors);

    const complementaryGroup = result.find(
      (group) => group.key === 'complementary'
    );
    expect(complementaryGroup).toBeDefined();
    expect(complementaryGroup?.colors.length).toBe(1);
    expect(complementaryGroup?.colors[0].equals(expectedComplementary)).toBe(
      true
    );
  });
  it('does not add complementary when complementary is already used', () => {
    const expectedComplementary =
      generateComplementaryColors(primary).complementary[0];

    const usedColors: OkColor[] = [primary, expectedComplementary];

    const result = filterAvailableColors(primary, usedColors);

    const complementaryGroup = result.find(
      (group) => group.key === 'complementary'
    );
    expect(complementaryGroup).toBeUndefined();
  });
  it('adds split when split colors are all available', () => {
    const expectedSplit = generateComplementaryColors(primary).split;

    const usedColors: OkColor[] = [primary];

    const result = filterAvailableColors(primary, usedColors);

    const splitGroup = result.find((group) => group.key === 'split');
    expect(splitGroup).toBeDefined();
    expect(splitGroup?.colors.length).toBe(2);
    expect(splitGroup?.colors[0].equals(expectedSplit[0])).toBe(true);
    expect(splitGroup?.colors[1].equals(expectedSplit[1])).toBe(true);
  });
  it('adds split when some split colors are available', () => {
    const expectedSplit = generateComplementaryColors(primary).split;

    const usedColors: OkColor[] = [primary, expectedSplit[1]];

    const result = filterAvailableColors(primary, usedColors);

    const splitGroup = result.find((group) => group.key === 'split');
    expect(splitGroup).toBeDefined();
    expect(splitGroup?.colors.length).toBe(1);
    expect(splitGroup?.colors[0].equals(expectedSplit[0])).toBe(true);
  });
  it('does not add split when split colors are already used', () => {
    const expectedSplit = generateComplementaryColors(primary).split;

    const usedColors: OkColor[] = [primary, ...expectedSplit];

    const result = filterAvailableColors(primary, usedColors);

    const splitGroup = result.find((group) => group.key === 'split');
    expect(splitGroup).toBeUndefined();
  });
  it('adds triadic when triadic colors are all available', () => {
    const expectedTriadic = generateComplementaryColors(primary).triadic;

    const usedColors: OkColor[] = [primary];

    const result = filterAvailableColors(primary, usedColors);

    const triadicGroup = result.find((group) => group.key === 'triadic');
    expect(triadicGroup).toBeDefined();
    expect(triadicGroup?.colors.length).toBe(2);
    expect(triadicGroup?.colors[0].equals(expectedTriadic[0])).toBe(true);
    expect(triadicGroup?.colors[1].equals(expectedTriadic[1])).toBe(true);
  });
  it('adds triadic when some triadic colors are available', () => {
    const expectedTriadic = generateComplementaryColors(primary).triadic;

    const usedColors: OkColor[] = [primary, expectedTriadic[1]];

    const result = filterAvailableColors(primary, usedColors);

    const triadicGroup = result.find((group) => group.key === 'triadic');
    expect(triadicGroup).toBeDefined();
    expect(triadicGroup?.colors.length).toBe(1);
    expect(triadicGroup?.colors[0].equals(expectedTriadic[0])).toBe(true);
  });
  it('does not add triadic when triadic colors are already used', () => {
    const expectedTriadic = generateComplementaryColors(primary).triadic;

    const usedColors: OkColor[] = [primary, ...expectedTriadic];

    const result = filterAvailableColors(primary, usedColors);

    const triadicGroup = result.find((group) => group.key === 'triadic');
    expect(triadicGroup).toBeUndefined();
  });
  it('adds analogous when analogous colors are all available', () => {
    const expectedAnalogous = generateComplementaryColors(primary).analogous;

    const usedColors: OkColor[] = [primary];

    const result = filterAvailableColors(primary, usedColors);

    const analogousGroup = result.find((group) => group.key === 'analogous');
    expect(analogousGroup).toBeDefined();
    expect(analogousGroup?.colors.length).toBe(4);
    expect(analogousGroup?.colors[0].equals(expectedAnalogous[0])).toBe(true);
    expect(analogousGroup?.colors[1].equals(expectedAnalogous[1])).toBe(true);
    expect(analogousGroup?.colors[2].equals(expectedAnalogous[2])).toBe(true);
    expect(analogousGroup?.colors[3].equals(expectedAnalogous[3])).toBe(true);
  });
  it('adds analogous when some analogous colors are available', () => {
    const expectedAnalogous = generateComplementaryColors(primary).analogous;

    const usedColors: OkColor[] = [
      primary,
      expectedAnalogous[1],
      expectedAnalogous[3],
    ];

    const result = filterAvailableColors(primary, usedColors);

    const analogousGroup = result.find((group) => group.key === 'analogous');
    expect(analogousGroup).toBeDefined();
    expect(analogousGroup?.colors.length).toBe(2);
    expect(analogousGroup?.colors[0].equals(expectedAnalogous[0])).toBe(true);
    expect(analogousGroup?.colors[1].equals(expectedAnalogous[2])).toBe(true);
  });
  it('does not add analogous when analogous colors are already used', () => {
    const expectedAnalogous = generateComplementaryColors(primary).analogous;

    const usedColors: OkColor[] = [primary, ...expectedAnalogous];

    const result = filterAvailableColors(primary, usedColors);

    const analogousGroup = result.find((group) => group.key === 'analogous');
    expect(analogousGroup).toBeUndefined();
  });
  it('adds hue-based group when all colors are available', () => {
    colorHueMap.forEach(({ key, hue }) => {
      const hues = generateAnalogousColors(primary.copyWith({ hue }), {
        angle: 15,
        count: 2,
      });
      const usedColors: OkColor[] = [];

      const result = filterAvailableColors(primary, usedColors);

      const hueGroup = result.find((group) => group.key === key);
      expect(
        hueGroup,
        `Hue group for key "${key}" should be defined`
      ).toBeDefined();
      expect(
        hueGroup?.colors.length,
        `Hue group for key "${key}" should have 4 colors`
      ).toBe(4);
      expect(
        hueGroup?.colors[0].equals(hues[0]),
        `Hue group for key "${key}" color 0 should match`
      ).toBe(true);
      expect(
        hueGroup?.colors[1].equals(hues[1]),
        `Hue group for key "${key}" color 1 should match`
      ).toBe(true);
      expect(
        hueGroup?.colors[2].equals(hues[2]),
        `Hue group for key "${key}" color 2 should match`
      ).toBe(true);
      expect(
        hueGroup?.colors[3].equals(hues[3]),
        `Hue group for key "${key}" color 3 should match`
      ).toBe(true);
    });
  });
  it('adds hue-based group when some hue colors are available', () => {
    colorHueMap.forEach(({ key, hue }) => {
      const hues = generateAnalogousColors(primary.copyWith({ hue }), {
        angle: 15,
        count: 2,
      });
      const usedColors: OkColor[] = [hues[0], hues[2]];

      const result = filterAvailableColors(primary, usedColors);

      const hueGroup = result.find((group) => group.key === key);
      expect(
        hueGroup,
        `Hue group for key "${key}" should be defined`
      ).toBeDefined();
      expect(
        hueGroup?.colors.length,
        `Hue group for key "${key}" should have 2 colors`
      ).toBe(2);
      expect(
        hueGroup?.colors[0].equals(hues[1]),
        `Hue group for key "${key}" color 0 should match`
      ).toBe(true);
      expect(
        hueGroup?.colors[1].equals(hues[3]),
        `Hue group for key "${key}" color 1 should match`
      ).toBe(true);
    });
  });
  it('does not add hue-based group when all colors are used', () => {
    colorHueMap.forEach(({ key, hue }) => {
      const hues = generateAnalogousColors(primary.copyWith({ hue }), {
        angle: 15,
        count: 2,
      });
      const usedColors: OkColor[] = [...hues];

      const result = filterAvailableColors(primary, usedColors);

      const hueGroup = result.find((group) => group.key === key);
      expect(
        hueGroup,
        `Hue group for key "${key}" should not be defined`
      ).toBeUndefined();
    });
  });
});
