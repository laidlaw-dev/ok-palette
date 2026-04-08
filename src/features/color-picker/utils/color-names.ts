export const suggestColorName = (
  baseName: string | undefined,
  usedNames: string[],
  counter: number = 1
): string => {
  const normalizedBase = baseName ? baseName.trim() : 'primary';

  const normalizedBaseLower = normalizedBase.toLowerCase();
  const normalizedUsedNames = usedNames.map((name) => name.toLowerCase());

  // If the base name isn't used, return it as is (unless it's "primary", which is reserved)
  if (!normalizedUsedNames.includes(normalizedBaseLower)) {
    return normalizedBase;
  }

  const baseRoot = normalizedBase.replace(/-\d+$/, ''); // Remove any existing -number suffix
  const newBase = `${baseRoot}-${counter}`;

  return suggestColorName(newBase, usedNames, counter + 1);
};

export const validateColorName = (
  name: string,
  usedNames: string[]
): boolean => {
  const normalizedName = name.toLowerCase().trim();
  if (normalizedName === '') {
    return false; // Empty names are not valid
  }
  const normalizedUsedNames = usedNames.map((name) => name.toLowerCase());

  return (
    !normalizedUsedNames.includes(normalizedName) &&
    !(normalizedName === 'primary')
  );
};
