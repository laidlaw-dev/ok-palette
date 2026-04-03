import { hexToRgb, rgbToHex } from './color-conversion';

describe('hexToRgb', () => {
  it('converts hex to rgb correctly', () => {
    expect(hexToRgb('#ff0000')).toEqual({
      r: expect.closeTo(1),
      g: expect.closeTo(0),
      b: expect.closeTo(0),
    });
    expect(hexToRgb('#AB12EF')).toEqual({
      r: expect.closeTo(0.67),
      g: expect.closeTo(0.07),
      b: expect.closeTo(0.94),
    });
    expect(hexToRgb('#AB12EFDB')).toEqual({
      r: expect.closeTo(0.67),
      g: expect.closeTo(0.07),
      b: expect.closeTo(0.94),
      alpha: expect.closeTo(0.86),
    });
    expect(hexToRgb('#abcd')).toEqual({
      r: expect.closeTo(0.67),
      g: expect.closeTo(0.73),
      b: expect.closeTo(0.8),
      alpha: expect.closeTo(0.87),
    });
    expect(hexToRgb('ff0000')).toEqual({
      r: expect.closeTo(1),
      g: expect.closeTo(0),
      b: expect.closeTo(0),
    });
    expect(hexToRgb('8Fa')).toEqual({
      r: expect.closeTo(0.53),
      g: expect.closeTo(1),
      b: expect.closeTo(0.67),
    });
    expect(hexToRgb('8fa7')).toEqual({
      r: expect.closeTo(0.53),
      g: expect.closeTo(1),
      b: expect.closeTo(0.67),
      alpha: expect.closeTo(0.47),
    });
  });
  it('throws an error for invalid hex', () => {
    expect(() => hexToRgb('invalid')).toThrow();
    expect(() => hexToRgb('#12345')).toThrow();
    expect(() => hexToRgb('#1234567')).toThrow();
    expect(() => hexToRgb('#123456789')).toThrow();
    expect(() => hexToRgb('#gggggg')).toThrow();
  });
});

describe('rgbToHex', () => {
  it('converts rgb to hex correctly', () => {
    expect(rgbToHex({ r: 1, g: 0, b: 0 })).toBe('#ff0000');
    expect(rgbToHex({ r: 0.67, g: 0.07, b: 0.94 })).toBe('#ab12f0');
    expect(rgbToHex({ r: 0.67, g: 0.07, b: 0.94, alpha: 0.86 })).toBe(
      '#ab12f0db'
    );
    expect(rgbToHex({ r: 0.53, g: 1, b: 0.67 })).toBe('#87ffab');
    expect(rgbToHex({ r: 0.53, g: 1, b: 0.67, alpha: 0.47 })).toBe('#87ffab78');
  });
});
