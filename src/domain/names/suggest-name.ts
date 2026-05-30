export const suggestName = (
  baseName: string,
  usedNames: string[],
  counter: number = 1
): string => {
  const normalizedBase = baseName.trim();

  const normalizedBaseLower = normalizedBase.toLowerCase();
  const normalizedUsedNames = usedNames.map((name) => name.toLowerCase());

  // If the base name isn't used, return it as is (unless it's "primary", which is reserved)
  if (!normalizedUsedNames.includes(normalizedBaseLower)) {
    return normalizedBase;
  }

  const baseRoot = normalizedBase.replace(/-\d+$/, ''); // Remove any existing -number suffix
  const newBase = `${baseRoot}-${counter}`;

  return suggestName(newBase, usedNames, counter + 1);
};
