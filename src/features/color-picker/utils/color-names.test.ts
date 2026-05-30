import { suggestColorName, validateColorName } from './color-names';

describe('suggestColorName', () => {
  it('returns base name when not used', () => {
    const baseName = 'yellow';
    const usedNames: string[] = ['red', 'green', 'blue'];

    const result = suggestColorName(baseName, usedNames);

    expect(result).toBe(baseName);
  });
  it('appends a number when base name is used', () => {
    const baseName = 'yellow';
    const usedNames: string[] = ['red', 'green', 'blue', 'yellow'];

    const result = suggestColorName(baseName, usedNames);

    expect(result).toBe('yellow-1');
  });
  it('finds the next available number', () => {
    const baseName = 'yellow';
    const usedNames: string[] = [
      'red',
      'green',
      'blue',
      'yellow',
      'yellow-1',
      'yellow-2',
    ];

    const result = suggestColorName(baseName, usedNames);

    expect(result).toBe('yellow-3');
  });
  it('handles non-sequential numbers', () => {
    const baseName = 'yellow';
    const usedNames: string[] = [
      'red',
      'green',
      'blue',
      'yellow',
      'yellow-1',
      'yellow-4',
    ];

    const result = suggestColorName(baseName, usedNames);

    expect(result).toBe('yellow-2');
  });
  it('matches case-insensitively on base name', () => {
    const baseName = 'Yellow';
    const usedNames: string[] = ['red', 'green', 'blue', 'yellow'];

    const result = suggestColorName(baseName, usedNames);

    expect(result).toBe('Yellow-1');
  });
  it('matches case-insensitively on used names', () => {
    const baseName = 'yellow';
    const usedNames: string[] = ['red', 'green', 'blue', 'Yellow'];

    const result = suggestColorName(baseName, usedNames);

    expect(result).toBe('yellow-1');
  });
  it('handles names that are substrings of each other', () => {
    const baseName = 'red';
    const usedNames: string[] = ['red', 'red-2', 'red-yellow-3', 'red-10'];

    const result = suggestColorName(baseName, usedNames);

    expect(result).toBe('red-1');
  });
});

describe('validateColorName', () => {
  it('returns true for valid names', () => {
    const usedNames: string[] = ['red', 'green', 'blue'];

    expect(validateColorName('yellow', usedNames)).toBe(true);
    expect(validateColorName('yellow-2', usedNames)).toBe(true);
    expect(validateColorName('primary-2', usedNames)).toBe(true);
  });
  it('matches case-insensitively on base name', () => {
    const usedNames: string[] = ['red', 'green', 'blue', 'yellow'];

    expect(validateColorName('Yellow', usedNames)).toBe(false);
  });
  it('matches case-insensitively on used names', () => {
    const usedNames: string[] = ['red', 'green', 'blue', 'Yellow'];

    expect(validateColorName('yellow', usedNames)).toBe(false);
  });
  it('returns false for empty names', () => {
    const usedNames: string[] = ['red', 'green', 'blue'];

    expect(validateColorName(' ', usedNames)).toBe(false);
  });
  it('returns false for names that are already used', () => {
    const usedNames: string[] = ['red', 'green', 'blue', 'yellow'];

    expect(validateColorName('yellow', usedNames)).toBe(false);
  });
});
