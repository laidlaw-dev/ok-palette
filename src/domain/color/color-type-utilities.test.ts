import { OPAQUE } from './color-constants';
import { asAlpha, asAngle, asNormalized } from './color-type-utilities';

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
