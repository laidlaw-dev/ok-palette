export const colorNotFoundError = (colorId: string) =>
  `Color with ID ${colorId} not found`;
export const colorSetNotFoundError = (colorSetId: string) =>
  `Color set with ID ${colorSetId} not found`;
export const colorAlreadyInSetError = (colorId: string, colorSetId: string) =>
  `Color with ID ${colorId} is already in color set with ID ${colorSetId}`;
export const colorNotInSetError = (colorId: string, colorSetId: string) =>
  `Color with ID ${colorId} is not in color set with ID ${colorSetId}`;
