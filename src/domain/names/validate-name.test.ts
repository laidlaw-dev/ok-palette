import { validateName } from './validate-name';

describe('validateName', () => {
  it('returns true for valid names', () => {
    const usedNames: string[] = ['red', 'green', 'blue'];

    expect(validateName('yellow', usedNames)).toBe(true);
    expect(validateName('yellow-2', usedNames)).toBe(true);
    expect(validateName('primary-2', usedNames)).toBe(true);
  });
  it('matches case-insensitively on base name', () => {
    const usedNames: string[] = ['red', 'green', 'blue', 'yellow'];

    expect(validateName('Yellow', usedNames)).toBe(false);
  });
  it('matches case-insensitively on used names', () => {
    const usedNames: string[] = ['red', 'green', 'blue', 'Yellow'];

    expect(validateName('yellow', usedNames)).toBe(false);
  });
  it('returns false for empty names', () => {
    const usedNames: string[] = ['red', 'green', 'blue'];

    expect(validateName(' ', usedNames)).toBe(false);
  });
  it('returns false for names that are already used', () => {
    const usedNames: string[] = ['red', 'green', 'blue', 'yellow'];

    expect(validateName('yellow', usedNames)).toBe(false);
  });
});
