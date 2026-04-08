import { oklch, rgb } from 'culori/css';
import { calculateChroma, calculateMaxChroma } from './calculate-chroma';
import {
  asAlpha,
  asChroma,
  asHue,
  asLightness,
  asNormalized,
} from './color-type-utilities';
import { asOkColorChromaConstructor, OkColor } from './ok-color';
import { ACHROMATIC, OPAQUE } from './color-constants';
import { formatCss, formatHex, parse } from 'culori/fn';
import { invalidHexError } from './color-errors';

describe('OkColor', () => {
  describe('constructor', () => {
    it('creates instance with properties set', () => {
      const lightness = 0.7;
      const harmonizedChroma = 0.8;
      const hue = 180;
      const alpha = 0.95;

      const chroma = getChromaValue(lightness, harmonizedChroma, hue);

      const okColor = new OkColor({
        lightness,
        harmonizedChroma,
        hue,
        alpha,
      });

      expect(okColor.lightness).toBe(lightness);
      expect(okColor.chroma).toBeCloseTo(chroma);
      expect(okColor.harmonizedChroma).toBe(harmonizedChroma);
      expect(okColor.hue).toBe(hue);
      expect(okColor.alpha).toBe(alpha);
    });
    it('creates instance with lightness = 0.0 when lightness param < 0.0', () => {
      const lightness = -0.5;
      const harmonizedChroma = 0.8;
      const hue = 180;
      const alpha = 0.95;

      const chroma = getChromaValue(lightness, harmonizedChroma, hue);

      const okColor = new OkColor({
        lightness,
        harmonizedChroma,
        hue,
        alpha,
      });

      expect(okColor.lightness).toBe(0);
      expect(okColor.chroma).toBeCloseTo(chroma);
      expect(okColor.harmonizedChroma).toBe(harmonizedChroma);
      expect(okColor.hue).toBe(hue);
      expect(okColor.alpha).toBe(alpha);
    });
    it('creates instance with lightness = 1.0 when lightness param > 1.0', () => {
      const lightness = 1.5;
      const harmonizedChroma = 0.8;
      const hue = 180;
      const alpha = 0.95;

      const chroma = getChromaValue(lightness, harmonizedChroma, hue);

      const okColor = new OkColor({
        lightness,
        harmonizedChroma,
        hue,
        alpha,
      });

      expect(okColor.lightness).toBe(1);
      expect(okColor.chroma).toBeCloseTo(chroma);
      expect(okColor.harmonizedChroma).toBe(harmonizedChroma);
      expect(okColor.hue).toBe(hue);
      expect(okColor.alpha).toBe(alpha);
    });
    it('creates instance with hue 0..359 when hue param > 359', () => {
      const lightness = 0.7;
      const harmonizedChroma = 0.8;
      const hue = 450;
      const alpha = 0.95;

      const chroma = getChromaValue(lightness, harmonizedChroma, hue);

      const okColor = new OkColor({
        lightness,
        harmonizedChroma,
        hue,
        alpha,
      });

      expect(okColor.lightness).toBe(lightness);
      expect(okColor.chroma).toBeCloseTo(chroma);
      expect(okColor.harmonizedChroma).toBe(harmonizedChroma);
      expect(okColor.hue).toBe(90);
      expect(okColor.alpha).toBe(alpha);
    });
    it('creates instance with hue undefined', () => {
      const lightness = 0.7;
      const harmonizedChroma = 0.8;
      const hue = undefined;
      const alpha = 0.95;

      const chroma = getChromaValue(lightness, harmonizedChroma, hue);

      const okColor = new OkColor({
        lightness,
        harmonizedChroma,
        hue,
        alpha,
      });

      expect(okColor.lightness).toBe(lightness);
      expect(okColor.chroma).toBeCloseTo(chroma);
      expect(okColor.harmonizedChroma).toBe(harmonizedChroma);
      expect(okColor.hue).toBeUndefined();
      expect(okColor.alpha).toBe(alpha);
    });
    it('creates instance with hue 0..359 when hue param < 0', () => {
      const lightness = 0.7;
      const harmonizedChroma = 0.8;
      const hue = -90;
      const alpha = 0.95;

      const chroma = getChromaValue(lightness, harmonizedChroma, hue);

      const okColor = new OkColor({
        lightness,
        harmonizedChroma,
        hue,
        alpha,
      });

      expect(okColor.lightness).toBe(lightness);
      expect(okColor.chroma).toBeCloseTo(chroma);
      expect(okColor.harmonizedChroma).toBe(harmonizedChroma);
      expect(okColor.hue).toBe(270);
      expect(okColor.alpha).toBe(alpha);
    });
    it('creates instance with alpha = 1.0 when alpha param is undefined', () => {
      const lightness = 0.7;
      const harmonizedChroma = 0.8;
      const hue = 180;

      const chroma = getChromaValue(lightness, harmonizedChroma, hue);

      const okColor = new OkColor({
        lightness,
        harmonizedChroma,
        hue,
      });

      expect(okColor.lightness).toBe(lightness);
      expect(okColor.chroma).toBeCloseTo(chroma);
      expect(okColor.harmonizedChroma).toBe(harmonizedChroma);
      expect(okColor.hue).toBe(hue);
      expect(okColor.alpha).toBe(1.0);
    });
    it('creates instance with alpha = 0.0 when alpha param < 0.0', () => {
      const lightness = 0.7;
      const harmonizedChroma = 0.8;
      const hue = 180;
      const alpha = -0.5;

      const chroma = getChromaValue(lightness, harmonizedChroma, hue);

      const okColor = new OkColor({
        lightness,
        harmonizedChroma,
        hue,
        alpha,
      });

      expect(okColor.lightness).toBe(lightness);
      expect(okColor.chroma).toBeCloseTo(chroma);
      expect(okColor.harmonizedChroma).toBe(harmonizedChroma);
      expect(okColor.hue).toBe(hue);
      expect(okColor.alpha).toBe(0);
    });
    it('creates instance with alpha undefined when alpha param > 1.0', () => {
      const lightness = 0.7;
      const harmonizedChroma = 0.8;
      const hue = 180;
      const alpha = 1.5;

      const chroma = getChromaValue(lightness, harmonizedChroma, hue);

      const okColor = new OkColor({
        lightness,
        harmonizedChroma,
        hue,
        alpha,
      });

      expect(okColor.lightness).toBe(lightness);
      expect(okColor.chroma).toBeCloseTo(chroma);
      expect(okColor.harmonizedChroma).toBe(harmonizedChroma);
      expect(okColor.hue).toBe(hue);
      expect(okColor.alpha).toBe(1.0);
    });
    it('creates instance with harmonized chroma = 0.0 when harmonized chroma param < 0.0', () => {
      const lightness = 0.7;
      const harmonizedChroma = -0.5;
      const hue = 180;
      const alpha = 0.95;

      const chroma = getChromaValue(lightness, harmonizedChroma, hue);

      const okColor = new OkColor({
        lightness: lightness,
        harmonizedChroma: harmonizedChroma,
        hue: hue,
        alpha: alpha,
      });

      expect(okColor.lightness).toBe(lightness);
      expect(okColor.chroma).toBeCloseTo(chroma);
      expect(okColor.harmonizedChroma).toBe(0.0);
      expect(okColor.hue).toBe(hue);
      expect(okColor.alpha).toBe(alpha);
    });
    it('creates instance with harmonized chroma = 1.0 when harmonized chroma param > 1.0', () => {
      const lightness = 0.7;
      const harmonizedChroma = 1.5;
      const hue = 180;
      const alpha = 0.95;

      const chroma = getChromaValue(lightness, harmonizedChroma, hue);

      const okColor = new OkColor({
        lightness,
        harmonizedChroma,
        hue,
        alpha,
      });

      expect(okColor.lightness).toBe(lightness);
      expect(okColor.chroma).toBeCloseTo(chroma);
      expect(okColor.harmonizedChroma).toBe(1.0);
      expect(okColor.hue).toBe(hue);
      expect(okColor.alpha).toBe(alpha);
    });
    it('creates instance with chroma', () => {
      const lightness = 0.7;
      const chroma = 0.1;
      const hue = 90;
      const alpha = 0.95;

      const maxChroma = getMaxChromaValue(lightness, hue);

      const okColor = new OkColor(
        asOkColorChromaConstructor({
          lightness,
          chroma,
          hue,
          alpha,
        })
      );

      expect(okColor.lightness).toBe(lightness);
      expect(okColor.chroma).toBeCloseTo(chroma);
      expect(okColor.harmonizedChroma).toBeCloseTo(chroma / maxChroma);
      expect(okColor.hue).toBe(hue);
      expect(okColor.alpha).toBe(alpha);
    });
    it('creates instance with chroma = 0.0 when chroma param > maxChroma', () => {
      const lightness = 0.7;
      const chroma = 0.9;
      const hue = 90;
      const alpha = 0.95;

      const maxChroma = getMaxChromaValue(lightness, hue);

      const okColor = new OkColor(
        asOkColorChromaConstructor({
          lightness,
          chroma,
          hue,
          alpha,
        })
      );

      expect(okColor.lightness).toBe(lightness);
      expect(okColor.chroma).toBeCloseTo(maxChroma);
      expect(okColor.harmonizedChroma).toBeCloseTo(1.0);
      expect(okColor.hue).toBe(hue);
      expect(okColor.alpha).toBe(alpha);
    });
  });
  describe('copyWith', () => {
    it('creates copy with lightness set', () => {
      const originalLightness = 0.7;
      const newLightness = 0.3;
      const harmonizedChroma = 0.8;
      const hue = 180;

      const source = new OkColor({
        lightness: originalLightness,
        harmonizedChroma,
        hue,
      });

      const newChroma = getChromaValue(newLightness, harmonizedChroma, hue);

      const okColor = source.copyWith({ lightness: newLightness });

      expect(okColor.lightness).toBe(newLightness);
      expect(okColor.chroma).toBeCloseTo(newChroma);
      expect(okColor.harmonizedChroma).toBe(harmonizedChroma);
      expect(okColor.hue).toBe(hue);
      expect(okColor.alpha).toBe(1);
    });
    it('creates copy with harmonized chroma set', () => {
      const lightness = 0.7;
      const originalHarmonizedChroma = 0.8;
      const newHarmonizedChroma = 0.3;
      const hue = 180;

      const source = new OkColor({
        lightness,
        harmonizedChroma: originalHarmonizedChroma,
        hue,
      });

      const newChroma = getChromaValue(lightness, newHarmonizedChroma, hue);

      const okColor = source.copyWith({
        harmonizedChroma: newHarmonizedChroma,
      });

      expect(okColor.lightness).toBe(lightness);
      expect(okColor.chroma).toBeCloseTo(newChroma);
      expect(okColor.harmonizedChroma).toBe(newHarmonizedChroma);
      expect(okColor.hue).toBe(hue);
      expect(okColor.alpha).toBe(1);
    });
    it('creates copy with hue set', () => {
      const lightness = 0.3;
      const harmonizedChroma = 0.8;
      const originalHue = 180;
      const newHue = 90;

      const source = new OkColor({
        lightness,
        harmonizedChroma,
        hue: originalHue,
      });

      const newChroma = getChromaValue(lightness, harmonizedChroma, newHue);

      const okColor = source.copyWith({ hue: newHue });

      expect(okColor.lightness).toBe(lightness);
      expect(okColor.chroma).toBeCloseTo(newChroma);
      expect(okColor.harmonizedChroma).toBe(harmonizedChroma);
      expect(okColor.hue).toBe(newHue);
      expect(okColor.alpha).toBe(1);
    });
    it('creates copy with hue set to ACHROMATIC', () => {
      const lightness = 0.3;
      const harmonizedChroma = 0.8;
      const originalHue = 180;
      const newHue = undefined;

      const source = new OkColor({
        lightness,
        harmonizedChroma,
        hue: originalHue,
      });

      const newChroma = getChromaValue(lightness, harmonizedChroma, newHue);

      const okColor = source.copyWith({ hue: ACHROMATIC });

      expect(okColor.lightness).toBe(lightness);
      expect(okColor.chroma).toBeCloseTo(newChroma);
      expect(okColor.harmonizedChroma).toBe(harmonizedChroma);
      expect(okColor.hue).toBeUndefined();
      expect(okColor.alpha).toBe(1);
    });
    it('creates copy with alpha set', () => {
      const lightness = 0.3;
      const harmonizedChroma = 0.8;
      const hue = 180;
      const originalAlpha = 0.9;
      const newAlpha = 0.4;

      const source = new OkColor({
        lightness,
        harmonizedChroma,
        hue,
        alpha: originalAlpha,
      });

      const newChroma = getChromaValue(lightness, harmonizedChroma, hue);

      const okColor = source.copyWith({ alpha: newAlpha });

      expect(okColor.lightness).toBe(lightness);
      expect(okColor.chroma).toBeCloseTo(newChroma);
      expect(okColor.harmonizedChroma).toBe(harmonizedChroma);
      expect(okColor.hue).toBe(hue);
      expect(okColor.alpha).toBe(newAlpha);
    });
  });
  describe('copyWithRotation', () => {
    it('creates copy with hue rotated by specified amount', () => {
      const lightness = 0.3;
      const harmonizedChroma = 0.8;
      const originalHue = 180;
      const rotation = 90;

      const source = new OkColor({
        lightness,
        harmonizedChroma,
        hue: originalHue,
      });

      const newHue = (originalHue + rotation) % 360;

      const newChroma = getChromaValue(lightness, harmonizedChroma, newHue);

      const okColor = source.copyWithRotation(rotation);

      expect(okColor.lightness).toBe(lightness);
      expect(okColor.chroma).toBeCloseTo(newChroma);
      expect(okColor.harmonizedChroma).toBe(harmonizedChroma);
      expect(okColor.hue).toBe(newHue);
      expect(okColor.alpha).toBe(1);
    });
    it('creates copy with hue rotated by specified negative amount', () => {
      const lightness = 0.3;
      const harmonizedChroma = 0.8;
      const originalHue = 180;
      const rotation = -90;

      const source = new OkColor({
        lightness,
        harmonizedChroma,
        hue: originalHue,
      });

      const newHue = (originalHue + rotation) % 360;

      const newChroma = getChromaValue(lightness, harmonizedChroma, newHue);

      const okColor = source.copyWithRotation(rotation);

      expect(okColor.lightness).toBe(lightness);
      expect(okColor.chroma).toBeCloseTo(newChroma);
      expect(okColor.harmonizedChroma).toBe(harmonizedChroma);
      expect(okColor.hue).toBe(newHue);
      expect(okColor.alpha).toBe(1);
    });
    it('creates copy with hue rotated by specified amount when hue is close to boundary', () => {
      const lightness = 0.3;
      const harmonizedChroma = 0.8;
      const originalHue = 330;
      const rotation = 90;

      const source = new OkColor({
        lightness,
        harmonizedChroma,
        hue: originalHue,
      });

      const newHue = (originalHue + rotation) % 360;

      const newChroma = getChromaValue(lightness, harmonizedChroma, newHue);

      const okColor = source.copyWithRotation(rotation);

      expect(okColor.lightness).toBe(lightness);
      expect(okColor.chroma).toBeCloseTo(newChroma);
      expect(okColor.harmonizedChroma).toBe(harmonizedChroma);
      expect(okColor.hue).toBe(newHue);
      expect(okColor.alpha).toBe(1);
    });
    it('creates copy with hue rotated by specified amount when hue is undefined', () => {
      const lightness = 0.3;
      const harmonizedChroma = 0.8;
      const originalHue = undefined;
      const rotation = 90;

      const source = new OkColor({
        lightness,
        harmonizedChroma,
        hue: originalHue,
      });

      const newChroma = getChromaValue(lightness, harmonizedChroma, undefined);

      const okColor = source.copyWithRotation(rotation);

      expect(okColor.lightness).toBe(lightness);
      expect(okColor.chroma).toBeCloseTo(newChroma);
      expect(okColor.harmonizedChroma).toBe(harmonizedChroma);
      expect(okColor.hue).toBeUndefined();
      expect(okColor.alpha).toBe(1);
    });
  });
  describe('equals', () => {
    it('returns true for equal colors', () => {
      const oklchA = {
        lightness: 0.7,
        harmonizedChroma: 0.5,
        hue: 15,
        alpha: 0.9,
      };
      const oklchB = { ...oklchA };

      const color1 = new OkColor(oklchA);
      const color2 = new OkColor(oklchB);
      expect(color1.equals(color2)).toBe(true);
    });
    it('returns true for equal colors when hue is close to wrap-around', () => {
      const oklchA = {
        lightness: 0.7,
        harmonizedChroma: 0.5,
        hue: 0.005,
        alpha: 0.9,
      };
      const oklchB = { ...oklchA, hue: 359.995 };

      const color1 = new OkColor(oklchA);
      const color2 = new OkColor(oklchB);
      expect(color1.equals(color2)).toBe(true);
    });
    it('returns true for equal colors when hue is ACHROMATIC', () => {
      const oklchA = {
        lightness: 0.7,
        harmonizedChroma: 0.5,
        hue: undefined,
        alpha: 0.9,
      };
      const oklchB = { ...oklchA, hue: undefined };

      const color1 = new OkColor(oklchA);
      const color2 = new OkColor(oklchB);
      expect(color1.equals(color2)).toBe(true);
    });
    it('returns false for different lighntness in colors', () => {
      const oklchA = {
        lightness: 0.7,
        harmonizedChroma: 0.5,
        hue: 15,
        alpha: 0.9,
      };
      const oklchB = { ...oklchA, lightness: 0.6 };

      const color1 = new OkColor(oklchA);
      const color2 = new OkColor(oklchB);
      expect(color1.equals(color2)).toBe(false);
    });
    it('returns false for different harmonized chroma in colors', () => {
      const oklchA = {
        lightness: 0.7,
        harmonizedChroma: 0.5,
        hue: 15,
        alpha: 0.9,
      };
      const oklchB = { ...oklchA, harmonizedChroma: 0.6 };

      const color1 = new OkColor(oklchA);
      const color2 = new OkColor(oklchB);
      expect(color1.equals(color2)).toBe(false);
    });
    it('returns false for different hue in colors', () => {
      const oklchA = {
        lightness: 0.7,
        harmonizedChroma: 0.5,
        hue: 15,
        alpha: 0.9,
      };
      const oklchB = { ...oklchA, hue: 270 };

      const color1 = new OkColor(oklchA);
      const color2 = new OkColor(oklchB);
      expect(color1.equals(color2)).toBe(false);
    });
    it('returns false for different hue in colors when one hue is ACHROMATIC', () => {
      const oklchA = {
        lightness: 0.7,
        harmonizedChroma: 0.5,
        hue: 15,
        alpha: 0.9,
      };
      const oklchB = { ...oklchA, hue: undefined };

      const color1 = new OkColor(oklchA);
      const color2 = new OkColor(oklchB);
      expect(color1.equals(color2)).toBe(false);
    });
    it('returns false for different alpha in colors', () => {
      const oklchA = {
        lightness: 0.7,
        harmonizedChroma: 0.5,
        hue: 15,
        alpha: 0.9,
      };
      const oklchB = { ...oklchA, alpha: 0.8 };

      const color1 = new OkColor(oklchA);
      const color2 = new OkColor(oklchB);
      expect(color1.equals(color2)).toBe(false);
    });
  });
  describe('css', () => {
    it('returns a css string', () => {
      const lightness = 0.3;
      const harmonizedChroma = 0.8;
      const hue = 180;
      const alpha = 0.9;

      const maxChroma = getMaxChromaValue(lightness, hue);

      const expectedCss = formatCss(
        rgb(
          oklch({
            mode: 'oklch',
            l: lightness,
            c: maxChroma * harmonizedChroma,
            h: hue,
            alpha: alpha,
          })
        )
      );

      const okColor = new OkColor({
        lightness,
        harmonizedChroma,
        hue,
        alpha,
      });
      const cssString = okColor.css;
      expect(cssString).toBe(expectedCss);
    });
    it('returns a css string when hue is ACHROMATIC', () => {
      const lightness = 0.3;
      const harmonizedChroma = 0.8;
      const hue = undefined;
      const alpha = 0.9;

      const maxChroma = getMaxChromaValue(lightness, hue);

      const expectedCss = formatCss(
        rgb(
          oklch({
            mode: 'oklch',
            l: lightness,
            c: maxChroma * harmonizedChroma,
            h: hue,
            alpha: alpha,
          })
        )
      );

      const okColor = new OkColor({
        lightness,
        harmonizedChroma,
        hue,
        alpha,
      });
      const cssString = okColor.css;
      expect(cssString).toBe(expectedCss);
    });
    it('returns a css string when alpha is OPAQUE', () => {
      const lightness = 0.3;
      const harmonizedChroma = 0.8;
      const hue = 180;
      const alpha = OPAQUE;

      const maxChroma = getMaxChromaValue(lightness, hue);

      const expectedCss = formatCss(
        rgb(
          oklch({
            mode: 'oklch',
            l: lightness,
            c: maxChroma * harmonizedChroma,
            h: hue,
          })
        )
      );

      const okColor = new OkColor({
        lightness,
        harmonizedChroma,
        hue,
        alpha,
      });
      const cssString = okColor.css;
      expect(cssString).toBe(expectedCss);
    });
  });
  describe('hex', () => {
    it('returns a hex string', () => {
      const lightness = 0.8;
      const chroma = 0.1;
      const hue = 180;
      const alpha = 0.9;

      const expectedHex = formatHex(
        oklch({
          mode: 'oklch',
          l: lightness,
          c: chroma,
          h: hue,
          alpha: alpha,
        })
      ).toLowerCase();

      const okColor = new OkColor(
        asOkColorChromaConstructor({
          lightness,
          chroma,
          hue,
          alpha,
        })
      );
      const hexString = okColor.hex;
      expect(hexString).toBe(expectedHex);
    });
    it('returns a hex string when hue is ACHROMATIC', () => {
      const lightness = 0.8;
      const chroma = 0;
      const hue = undefined;
      const alpha = 0.9;

      const expectedHex = formatHex(
        oklch({
          mode: 'oklch',
          l: lightness,
          c: chroma,
          h: hue,
          alpha: alpha,
        })
      ).toLowerCase();

      const okColor = new OkColor(
        asOkColorChromaConstructor({
          lightness,
          chroma,
          hue,
          alpha,
        })
      );
      const hexString = okColor.hex;
      expect(hexString).toBe(expectedHex);
    });
    it('returns a hex string when alpha is default', () => {
      const lightness = 0.8;
      const chroma = 0.1;
      const hue = 180;

      const expectedHex = formatHex(
        oklch({
          mode: 'oklch',
          l: lightness,
          c: chroma,
          h: hue,
        })
      ).toLowerCase();

      const okColor = new OkColor(
        asOkColorChromaConstructor({
          lightness,
          chroma,
          hue,
        })
      );
      const hexString = okColor.hex;
      expect(hexString).toBe(expectedHex);
    });
    it('returns a hex string without alpha when alpha is OPAQUE', () => {
      const lightness = 0.8;
      const chroma = 0.1;
      const hue = 180;
      const alpha = OPAQUE;

      const expectedHex = formatHex(
        oklch({
          mode: 'oklch',
          l: lightness,
          c: chroma,
          h: hue,
        })
      ).toLowerCase();

      const okColor = new OkColor(
        asOkColorChromaConstructor({
          lightness,
          chroma,
          hue,
          alpha,
        })
      );
      const hexString = okColor.hex;
      expect(hexString).toBe(expectedHex);
    });
  });
  describe('rgb', () => {
    it('returns rgb object', () => {
      const lightness = 0.8;
      const chroma = 0.1;
      const hue = 180;
      const alpha = 0.9;

      const expectedRgb = rgb(
        oklch({
          mode: 'oklch',
          l: lightness,
          c: chroma,
          h: hue,
          alpha: alpha,
        })
      );

      const color = new OkColor(
        asOkColorChromaConstructor({ lightness, chroma, hue, alpha })
      );
      const rgbObject = color.rgb;
      expect(rgbObject.r).toEqual(expectedRgb.r);
      expect(rgbObject.g).toEqual(expectedRgb.g);
      expect(rgbObject.b).toEqual(expectedRgb.b);
      expect(rgbObject.alpha).toEqual(expectedRgb.alpha);
    });
    it('returns rgb object when hue is ACHROMATIC', () => {
      const lightness = 0.8;
      const chroma = 0;
      const hue = undefined;
      const alpha = 0.9;

      const expectedRgb = rgb(
        oklch({
          mode: 'oklch',
          l: lightness,
          c: chroma,
          h: hue,
          alpha: alpha,
        })
      );

      const color = new OkColor(
        asOkColorChromaConstructor({ lightness, chroma, hue, alpha })
      );
      const rgbObject = color.rgb;
      expect(rgbObject.r).toEqual(expectedRgb.r);
      expect(rgbObject.g).toEqual(expectedRgb.g);
      expect(rgbObject.b).toEqual(expectedRgb.b);
      expect(rgbObject.alpha).toEqual(expectedRgb.alpha);
    });
    it('returns rgb object when alpha is default', () => {
      const lightness = 0.8;
      const chroma = 0.1;
      const hue = 180;

      const expectedRgb = rgb(
        oklch({
          mode: 'oklch',
          l: lightness,
          c: chroma,
          h: hue,
        })
      );

      const color = new OkColor(
        asOkColorChromaConstructor({ lightness, chroma, hue })
      );
      const rgbObject = color.rgb;
      expect(rgbObject.r).toEqual(expectedRgb.r);
      expect(rgbObject.g).toEqual(expectedRgb.g);
      expect(rgbObject.b).toEqual(expectedRgb.b);
      expect(rgbObject.alpha).toEqual(expectedRgb.alpha);
    });
    it('returns rgb object without alpha when alpha is OPAQUE', () => {
      const lightness = 0.8;
      const chroma = 0.1;
      const hue = 180;
      const alpha = OPAQUE;

      const expectedRgb = rgb(
        oklch({
          mode: 'oklch',
          l: lightness,
          c: chroma,
          h: hue,
        })
      );

      const color = new OkColor(
        asOkColorChromaConstructor({ lightness, chroma, hue, alpha })
      );
      const rgbObject = color.rgb;
      expect(rgbObject.r).toEqual(expectedRgb.r);
      expect(rgbObject.g).toEqual(expectedRgb.g);
      expect(rgbObject.b).toEqual(expectedRgb.b);
      expect(rgbObject.alpha).toEqual(expectedRgb.alpha);
    });
  });
  describe('fromHex', () => {
    it('creates OkColor from valid hex', () => {
      const validHexStrings = [
        '#f73',
        '#F73',
        '#ff5783',
        '#FF5783',
        '#ff5783cc',
        ' #ff5783 ',
        'f73',
        'F73',
        'ff5783',
        'FF5783',
        'ff5783cc',
        'FF5783CC',
      ];

      validHexStrings.forEach((hexString) => {
        const rgbColor = parse(hexString.trim());
        const expectedOklch = oklch(rgbColor)!;
        const expectedHue = asHue(expectedOklch.h);

        const okColor = OkColor.fromHex(hexString);

        const maxChroma = getMaxChromaValue(expectedOklch.l, expectedHue);

        expect(
          okColor.lightness,
          `Expected lightness: ${expectedOklch.l} from ${hexString}`
        ).toBeCloseTo(expectedOklch.l);
        expect(
          okColor.chroma,
          `Expected chroma: ${expectedOklch.c} from ${hexString}`
        ).toBeCloseTo(expectedOklch.c);
        expect(
          okColor.hue,
          `Expected hue: ${expectedOklch.h} from ${hexString}`
        ).toBeCloseTo(expectedHue!);
        expect(
          okColor.alpha,
          `Expected alpha: ${expectedOklch.alpha ?? 1} from ${hexString}`
        ).toBeCloseTo(expectedOklch.alpha ?? 1);

        const expectedHarmonizedChroma =
          maxChroma === 0 ? 1 : expectedOklch.c / maxChroma;
        expect(
          okColor.harmonizedChroma,
          `Expected harmonized chroma: ${expectedHarmonizedChroma} from ${hexString} (${expectedOklch.c}, ${maxChroma})`
        ).toBeCloseTo(expectedHarmonizedChroma);
      });
    });
    it('creates achromatic OkColor from valid hex', () => {
      const validHexStrings = [
        '#FFF',
        '#777',
        '#000',
        '#FFFF',
        '#7777',
        '#0000',
        '#FFFFFF',
        '#777777',
        '#000000',
        '#FFFFFFA0',
        '#777777A0',
        '#000000A0',
        'FFF',
        'FFFF',
        'FFFFFF',
        'FFFFFFFF',
      ];

      validHexStrings.forEach((hexString) => {
        const rgbColor = parse(hexString.trim());
        const expectedOklch = oklch(rgbColor)!;
        const expectedHue = asHue(expectedOklch.h)!;

        const okColor = OkColor.fromHex(hexString);

        const maxChroma = getMaxChromaValue(expectedOklch.l, expectedHue);

        expect(
          okColor.lightness,
          `Expected lightness: ${expectedOklch.l} from ${hexString}`
        ).toBeCloseTo(expectedOklch.l);
        expect(
          okColor.chroma,
          `Expected chroma: ${expectedOklch.c} from ${hexString}`
        ).toBeCloseTo(expectedOklch.c);
        expect(
          okColor.hue,
          `Expected hue: undefined from ${hexString}`
        ).toBeUndefined();
        expect(
          okColor.alpha,
          `Expected alpha: ${expectedOklch.alpha ?? 1} from ${hexString}`
        ).toBeCloseTo(expectedOklch.alpha ?? 1);

        const expectedHarmonizedChroma =
          maxChroma === 0 ? 1 : expectedOklch.c / maxChroma;
        expect(
          okColor.harmonizedChroma,
          `Expected harmonized chroma: ${expectedHarmonizedChroma} from ${hexString} (${expectedOklch.c}, ${maxChroma})`
        ).toBeCloseTo(expectedHarmonizedChroma);
      });
    });
    it('throws error is hex is invalid', () => {
      const invalidHexStrings = [
        '',
        '   ',
        '#ff573',
        'FFFFF',
        'ff573',
        '#gggggg',
        '#ff5733zz',
      ];

      invalidHexStrings.forEach((hexString) => {
        expect(() => {
          OkColor.fromHex(hexString);
        }, `Expected "${hexString}" to be an invalid hex string`).toThrow(
          invalidHexError(hexString)
        );
      });
    });
  });
  describe('fromRgb', () => {
    it('creates an OkColor instance from an RGB object', () => {
      const red = 0.25;
      const green = 0.5;
      const blue = 0.75;
      const alpha = 0.8;

      const expectedOklch = oklch({
        mode: 'rgb',
        r: red,
        g: green,
        b: blue,
        alpha: alpha,
      });
      const expectedHue = asHue(expectedOklch.h);

      const okColor = OkColor.fromRgb({
        r: red,
        g: green,
        b: blue,
        alpha: alpha,
      });

      const maxChroma = getMaxChromaValue(expectedOklch.l, expectedHue);

      expect(okColor.lightness).toBeCloseTo(expectedOklch.l);
      expect(okColor.chroma).toBeCloseTo(expectedOklch.c);
      expect(okColor.hue).toBeCloseTo(expectedHue!);
      expect(okColor.alpha).toBeCloseTo(alpha);
      expect(okColor.harmonizedChroma).toBeCloseTo(expectedOklch.c / maxChroma);
    });
    it('creates an OkColor instance from an RGB object without alpha', () => {
      const red = 0.25;
      const green = 0.5;
      const blue = 0.75;

      const expectedOklch = oklch({
        mode: 'rgb',
        r: red,
        g: green,
        b: blue,
      });
      const expectedHue = asHue(expectedOklch.h);

      const okColor = OkColor.fromRgb({
        r: red,
        g: green,
        b: blue,
      });

      const maxChroma = getMaxChromaValue(expectedOklch.l, expectedHue);

      expect(okColor.lightness).toBeCloseTo(expectedOklch.l);
      expect(okColor.chroma).toBeCloseTo(expectedOklch.c);
      expect(okColor.hue).toBeCloseTo(expectedHue!);
      expect(okColor.alpha).toBe(1);
      expect(okColor.harmonizedChroma).toBeCloseTo(expectedOklch.c / maxChroma);
    });
    it('creates an OkColor instance from a grey RGB object', () => {
      const red = 0.25;
      const green = 0.25;
      const blue = 0.25;
      const alpha = 1.0;

      const expectedOklch = oklch({
        mode: 'rgb',
        r: red,
        g: green,
        b: blue,
        alpha: alpha,
      });

      const okColor = OkColor.fromRgb({
        r: red,
        g: green,
        b: blue,
        alpha: alpha,
      });

      expect(okColor.lightness).toBeCloseTo(expectedOklch.l);
      expect(okColor.chroma).toBeCloseTo(0);
      expect(okColor.hue).toBeUndefined();
      expect(okColor.alpha).toBe(alpha);
      expect(okColor.harmonizedChroma).toBeCloseTo(1);
    });
    it('creates an OkColor instance with clamped values when creating from RGB', () => {
      const red = 1.5;
      const green = -0.5;
      const blue = 0.75;
      const alpha = 1.2;

      const expectedOklch = oklch({
        mode: 'rgb',
        r: asNormalized(red)!,
        g: asNormalized(green)!,
        b: asNormalized(blue)!,
        alpha: asAlpha(alpha),
      });
      const expectedHue = asHue(expectedOklch.h);

      const okColor = OkColor.fromRgb({
        r: red,
        g: green,
        b: blue,
        alpha: alpha,
      });

      const maxChroma = getMaxChromaValue(expectedOklch.l, expectedHue);

      expect(okColor.lightness).toBeCloseTo(expectedOklch.l);
      expect(okColor.chroma).toBeCloseTo(expectedOklch.c);
      expect(okColor.hue).toBeCloseTo(expectedHue!);
      expect(okColor.alpha).toBe(asAlpha(alpha));
      expect(okColor.harmonizedChroma).toBeCloseTo(expectedOklch.c / maxChroma);
    });
  });
});

//*************************************** */
//
//  Helper functions
//
//************************************** */

const getChromaValue = (
  lightness: number,
  hChroma: number,
  hue: number | undefined
) => {
  return calculateChroma(asLightness(lightness), asChroma(hChroma), asHue(hue));
};

const getMaxChromaValue = (lightness: number, hue: number | undefined) => {
  return calculateMaxChroma(asLightness(lightness), asHue(hue));
};
