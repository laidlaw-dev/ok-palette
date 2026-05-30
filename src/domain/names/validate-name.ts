export const validateName = (name: string, usedNames: string[]): boolean => {
  const normalizedName = name.toLowerCase().trim();
  if (normalizedName === '') {
    return false; // Empty names are not valid
  }
  const normalizedUsedNames = usedNames.map((name) => name.toLowerCase());

  return !normalizedUsedNames.includes(normalizedName);
};
