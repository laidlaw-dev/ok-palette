import { OPAQUE } from './color-constants';
import {
  asAlpha,
  asAngle,
  asNormalized,
  isAngleEqual,
  isNormalizedEqual,
} from './color-type-utilities';

describe('asNormalized', () => {
  it('returns value when value >= 0 and <= 1', () => {
    expect(asNormalized(0)).toBe(0);
    expect(asNormalized(0.5)).toBe(0.5);
    expect(asNormalized(1)).toBe(1);
  });
  it('returns 0 when value < 0', () => {
    expect(asNormalized(-0.5)).toBe(0);
    expect(asNormalized(-1)).toBe(0);
  });
  it('returns 1 when value > 1', () => {
    expect(asNormalized(1.5)).toBe(1);
    expect(asNormalized(2)).toBe(1);
  });
  it('returns undefined when value is undefined', () => {
    expect(asNormalized(undefined)).toBeUndefined();
  });
});

describe('asAngle', () => {
  it('returns value when value >= 0 and value <= 359', () => {
    expect(asAngle(0)).toBe(0);
    expect(asAngle(90)).toBe(90);
    expect(asAngle(270)).toBe(270);
    expect(asAngle(359)).toBe(359);
  });
  it('returns rotated value between 0 and 359 when value < 0', () => {
    expect(asAngle(-1)).toBe(359);
    expect(asAngle(-90)).toBe(270);
    expect(asAngle(-360)).toBe(0);
    expect(asAngle(-450)).toBe(270);
    expect(asAngle(-720)).toBe(0);
    expect(asAngle(-810)).toBe(270);
  });
  it('returns rotated value between 0 and 359 when value > 359', () => {
    expect(asAngle(360)).toBe(0);
    expect(asAngle(450)).toBe(90);
    expect(asAngle(720)).toBe(0);
    expect(asAngle(810)).toBe(90);
  });
  it('returns 0 when value is undefined', () => {
    expect(asAngle(undefined)).toBe(0);
  });
});

describe('asAlpha', () => {
  it('returns value when value >= 0 and <= 1', () => {
    expect(asAlpha(0)).toBe(0);
    expect(asAlpha(0.5)).toBe(0.5);
    expect(asAlpha(1)).toBe(1);
  });
  it('returns 0 when value < 0', () => {
    expect(asAlpha(-0.5)).toBe(0);
    expect(asAlpha(-1)).toBe(0);
  });
  it('returns 1 when value > 1', () => {
    expect(asAlpha(1.5)).toBe(1);
    expect(asAlpha(2)).toBe(1);
  });
  it('returns 1 when value is undefined', () => {
    expect(asAlpha(undefined)).toBe(OPAQUE);
  });
});

describe('isNormalizedEqual', () => {
  it('returns true when values are equal with tolerance of normalized tolerance', () => {
    expect(isNormalizedEqual(0, 0.0005)).toBe(true);
    expect(isNormalizedEqual(0.5, 0.4995)).toBe(true);
    expect(isNormalizedEqual(0.5, 0.5005)).toBe(true);
    expect(isNormalizedEqual(1, 0.9995)).toBe(true);
    expect(isNormalizedEqual(1, 1.0005)).toBe(true);
  });
  it('returns true when normalized values are equal with tolerance of normalized tolerance', () => {
    expect(isNormalizedEqual(-1.0, 0.0005)).toBe(true);
    expect(isNormalizedEqual(1.0, 1.5)).toBe(true);
  });

  it('returns false when values differ more than normalized tolerance', () => {
    expect(isNormalizedEqual(0, 0.002)).toBe(false);
    expect(isNormalizedEqual(0.5, 0.498)).toBe(false);
    expect(isNormalizedEqual(0.5, 0.502)).toBe(false);
    expect(isNormalizedEqual(1, 0.998)).toBe(false);
  });
  it('considers undefined values as equal', () => {
    expect(isNormalizedEqual(undefined, undefined)).toBe(true);
  });
  it('considers undefined value and defined value as not equal', () => {
    expect(isNormalizedEqual(undefined, 0)).toBe(false);
    expect(isNormalizedEqual(0, undefined)).toBe(false);
  });
});

describe('isAngleEqual', () => {
  it('returns true when values are equal with tolerance of angle tolerance', () => {
    expect(isAngleEqual(0, -0.005)).toBe(true);
    expect(isAngleEqual(0, 0.005)).toBe(true);
    expect(isAngleEqual(180, 179.995)).toBe(true);
    expect(isAngleEqual(180, 180.005)).toBe(true);
  });

  it('returns false when values differ more than tolerance of angle tolerance', () => {
    expect(isAngleEqual(0, -0.02)).toBe(false);
    expect(isAngleEqual(0, 0.02)).toBe(false);
    expect(isAngleEqual(180, 179.98)).toBe(false);
    expect(isAngleEqual(180, 180.02)).toBe(false);
  });

  it('handles angle wrap-around correctly', () => {
    expect(isAngleEqual(0, 359.995)).toBe(true);
    expect(isAngleEqual(359.995, 0)).toBe(true);
    expect(isAngleEqual(0, 359.98)).toBe(false);
    expect(isAngleEqual(359.98, 0)).toBe(false);
    expect(isAngleEqual(180, 539.995)).toBe(true);
    expect(isAngleEqual(539.995, 180)).toBe(true);
    expect(isAngleEqual(180, 539.98)).toBe(false);
    expect(isAngleEqual(539.98, 180)).toBe(false);
  });

  it('considers undefined angles as equal', () => {
    expect(isAngleEqual(undefined, undefined)).toBe(true);
  });

  it('considers undefined angle and defined angle as not equal', () => {
    expect(isAngleEqual(undefined, 0)).toBe(false);
    expect(isAngleEqual(0, undefined)).toBe(false);
  });
});
