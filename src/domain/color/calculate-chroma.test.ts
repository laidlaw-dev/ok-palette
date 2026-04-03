import { oklch } from 'culori/css';
import { inGamut } from 'culori/fn';
import { calculateChroma, calculateMaxChroma } from './calculate-chroma';
import { asChroma, asHue, asLightness } from './color-type-utilities';
import { NORMALIZED_TOLERANCE } from './color-constants';

const inRgb = inGamut('rgb');

describe('calculateMaxChroma', () => {
  it('returns 0 when lightness is 0', () => {
    expect(calculateMaxChroma(asLightness(0), asHue(180))).toBe(0);
  });
  it('returns 0 when lightness is 1', () => {
    expect(calculateMaxChroma(asLightness(1), asHue(180))).toBe(0);
  });
  it('returns max chroma for a visible very dark magenta', () => {
    const lightness = asLightness(0.01);
    const hue = asHue(0);
    const maxChroma = calculateMaxChroma(lightness, hue);
    expect(
      inRgb(oklch({ mode: 'oklch', l: lightness, c: maxChroma, h: hue }))
    ).toBe(true);
    expect(
      inRgb(
        oklch({
          mode: 'oklch',
          l: lightness,
          c: maxChroma + NORMALIZED_TOLERANCE,
          h: hue,
        })
      )
    ).toBe(false);
  });
  it('returns max chroma for a visible dark red', () => {
    const lightness = asLightness(0.2);
    const hue = asHue(15);
    const maxChroma = calculateMaxChroma(lightness, hue);
    expect(
      inRgb(oklch({ mode: 'oklch', l: lightness, c: maxChroma, h: hue }))
    ).toBe(true);
    expect(
      inRgb(
        oklch({
          mode: 'oklch',
          l: lightness,
          c: maxChroma + NORMALIZED_TOLERANCE,
          h: hue,
        })
      )
    ).toBe(false);
  });
  it('returns max chroma for a visible mid green', () => {
    const lightness = asLightness(0.5);
    const hue = asHue(135);
    const maxChroma = calculateMaxChroma(lightness, hue);
    expect(
      inRgb(oklch({ mode: 'oklch', l: lightness, c: maxChroma, h: hue }))
    ).toBe(true);
    expect(
      inRgb(
        oklch({
          mode: 'oklch',
          l: lightness,
          c: maxChroma + NORMALIZED_TOLERANCE,
          h: hue,
        })
      )
    ).toBe(false);
  });
  it('returns max chroma for a visible light blue', () => {
    const lightness = asLightness(0.7);
    const hue = asHue(240);
    const maxChroma = calculateMaxChroma(lightness, hue);
    expect(
      inRgb(oklch({ mode: 'oklch', l: lightness, c: maxChroma, h: hue }))
    ).toBe(true);
    expect(
      inRgb(
        oklch({
          mode: 'oklch',
          l: lightness,
          c: maxChroma + NORMALIZED_TOLERANCE,
          h: hue,
        })
      )
    ).toBe(false);
  });
  it('returns max chroma for a visible very light magenta', () => {
    const lightness = asLightness(0.99);
    const hue = asHue(359);
    const maxChroma = calculateMaxChroma(lightness, hue);
    expect(
      inRgb(oklch({ mode: 'oklch', l: lightness, c: maxChroma, h: hue }))
    ).toBe(true);
    expect(
      inRgb(
        oklch({
          mode: 'oklch',
          l: lightness,
          c: maxChroma + NORMALIZED_TOLERANCE,
          h: hue,
        })
      )
    ).toBe(false);
  });
});

describe('calculateChroma', () => {
  it('returns 0 when lightness is 0', () => {
    const lightness = asLightness(0);
    const harmonizedChroma = asChroma(1);
    const hue = asHue(180);

    expect(calculateChroma(lightness, harmonizedChroma, hue)).toBe(0);
  });
  it('returns 0 when lightness is 1', () => {
    const lightness = asLightness(1);
    const harmonizedChroma = asChroma(1);
    const hue = asHue(180);

    expect(calculateChroma(lightness, harmonizedChroma, hue)).toBe(0);
  });
  it('returns 0 when harmonizedChroma is 0', () => {
    const lightness = asLightness(1);
    const harmonizedChroma = asChroma(0);
    const hue = asHue(180);

    expect(calculateChroma(lightness, harmonizedChroma, hue)).toBe(0);
  });
  it('returns 0.01 * max chroma when harmonizedChroma is 0.01', () => {
    const lightness = asLightness(0.7);
    const harmonizedChroma = asChroma(0.01);
    const hue = asHue(45);

    const maxChroma = calculateMaxChroma(lightness, hue);

    expect(calculateChroma(lightness, harmonizedChroma, hue)).toBeCloseTo(
      0.01 * maxChroma
    );
  });
  it('returns 0.2 * max chroma when harmonizedChroma is 0.2', () => {
    const lightness = asLightness(0.7);
    const harmonizedChroma = asChroma(0.2);
    const hue = asHue(90);

    const maxChroma = calculateMaxChroma(lightness, hue);

    expect(calculateChroma(lightness, harmonizedChroma, hue)).toBeCloseTo(
      0.2 * maxChroma
    );
  });
  it('returns 0.7 * max chroma when harmonizedChroma is 0.7', () => {
    const lightness = asLightness(0.7);
    const harmonizedChroma = asChroma(0.7);
    const hue = asHue(270);

    const maxChroma = calculateMaxChroma(lightness, hue);

    expect(calculateChroma(lightness, harmonizedChroma, hue)).toBeCloseTo(
      0.7 * maxChroma
    );
  });
  it('rolls off when harmonizedChroma is 0.9 and lightness >= 0.85', () => {
    const harmonizedChroma = asChroma(0.9);
    const hue = asHue(90);

    const lightness_085 = asLightness(0.85);
    const lightness_090 = asLightness(0.9);
    const lightness_095 = asLightness(0.95);
    const lightness_099 = asLightness(0.99);

    const maxChroma_85 = calculateMaxChroma(lightness_085, hue);
    const maxChroma_90 = calculateMaxChroma(lightness_090, hue);
    const maxChroma_95 = calculateMaxChroma(lightness_095, hue);
    const maxChroma_99 = calculateMaxChroma(lightness_099, hue);

    expect(calculateChroma(lightness_085, harmonizedChroma, hue)).toBeCloseTo(
      harmonizedChroma * maxChroma_85
    );
    expect(calculateChroma(lightness_090, harmonizedChroma, hue)).toBeLessThan(
      harmonizedChroma * maxChroma_90
    );
    expect(calculateChroma(lightness_095, harmonizedChroma, hue)).toBeLessThan(
      harmonizedChroma * maxChroma_95
    );
    expect(calculateChroma(lightness_099, harmonizedChroma, hue)).toBeLessThan(
      harmonizedChroma * maxChroma_99
    );
  });
});
