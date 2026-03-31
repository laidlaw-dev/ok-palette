import { isValidOpaqueHex } from './color-validation';

describe('isValidOpaqueHex', () => {
  it('returns true for valid trimmed 6 char hex', () => {
    const hexValues = [
      '#fa2277',
      '#000000',
      '#Fa22AC',
      'fa2277',
      '000000',
      'Fa22AC',
      ' #Fa22AC ',
      ' Fa22AC ',
    ];
    hexValues.forEach((hex) => {
      expect(isValidOpaqueHex(hex), `Expected ${hex} to be valid`).toBe(true);
    });
  });
  it('returns true for valid trimmed 3 char hex', () => {
    const hexValues = [
      '#fa2',
      '#000',
      '#Fa2',
      'fa2',
      '000',
      'Fa2',
      ' #Fa2 ',
      ' Fa2 ',
    ];
    hexValues.forEach((hex) => {
      expect(isValidOpaqueHex(hex), `Expected ${hex} to be valid`).toBe(true);
    });
  });
  it('returns false for 8 char hex', () => {
    const hexValues = [
      '#fa227700',
      '#00000000',
      '#Fa22ACFF',
      'fa227700',
      '00000000',
      'Fa22ACFF',
    ];
    hexValues.forEach((hex) => {
      expect(isValidOpaqueHex(hex), `Expected ${hex} to be invalid`).toBe(
        false
      );
    });
  });
  it('returns false for 4 char hex', () => {
    const hexValues = ['#fa22', '#0000', '#Fa22', 'fa22', '0000', 'Fa22'];
    hexValues.forEach((hex) => {
      expect(isValidOpaqueHex(hex), `Expected ${hex} to be invalid`).toBe(
        false
      );
    });
  });
  it('returns false for non-hex strings', () => {
    const hexValues = [
      'invalid',
      '#ab',
      '#ggg',
      '#abcde',
      '#abcdef1',
      '#123456789',
      '',
      '#',
    ];
    hexValues.forEach((hex) => {
      expect(isValidOpaqueHex(hex), `Expected ${hex} to be invalid`).toBe(
        false
      );
    });
  });
});
