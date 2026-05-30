import { useMemo } from 'react';
import { usePaletteStore } from './palette-store';
import { generatePaletteColors } from '@/stores/palette/generate-palette-colors';
import type { OkColor } from '@/domain/color';

/**
 * Hook for managing and accessing palette state and generated colors.
 *
 * @returns {Object} An object containing palette management utilities and data.
 * @returns {boolean} returns.isInitialized - Whether a palette has been selected and initialized.
 * @returns {Function} returns.initialize - Function to initialize the palette store.
 * @returns {Object} returns.generatedPalette - The generated color palette based on the selected palette and color sets.
 *
 * @example
 * const { isInitialized, initialize, generatedPalette } = usePalette();
 */
export const usePalette = () => {
  const palettes = usePaletteStore((state) => state);

  const initialize = (name: string, primaryColor: OkColor) => {
    palettes.initialize(name, primaryColor);
  };

  const generatedPalette = useMemo(() => {
    const selectedPalette = palettes.palettes.find(
      (p) => p.id === palettes.selectedPaletteId
    );
    return generatePaletteColors({
      palette: selectedPalette,
      colorSets: palettes.colorSets,
      allColors: palettes.colors,
    });
  }, [
    palettes.palettes,
    palettes.selectedPaletteId,
    palettes.colors,
    palettes.colorSets,
  ]);

  return {
    isInitialized: palettes.selectedPaletteId !== '',
    primaryColor: palettes.primaryColor,
    initialize: initialize,
    addColor: palettes.addColor,
    removeColor: palettes.removeColor,
    addColorSet: palettes.addColorSet,
    removeColorSet: palettes.removeColorSet,
    addColorToSet: palettes.addColorToSet,
    removeColorFromSet: palettes.removeColorFromSet,
    setColorSetLightness: palettes.setColorSetLightness,
    setColorSetChroma: palettes.setColorSetChroma,
    generatedPalette,
  };
};
