import { RgbColorPicker } from '@/components/color-pickers';
import { OkButton, OkTitle } from '@/components/ui';
import { usePalette } from '@/stores/palette/usePalette';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * A dialog component for selecting an initial color in the palette setup process.
 *
 * Provides a color picker interface that allows users to select an RGB color
 * which is then used to initialize the palette. Defaults to a blue color (rgb(0, 128, 204)).
 *
 * @component
 * @returns {JSX.Element} A dialog containing a title, color picker, and selection button.
 *
 * @example
 * ```tsx
 * <InitialColorDialog />
 * ```
 *
 * @requires useTranslation - For internationalization of UI labels
 * @requires usePalette - For accessing the palette initialization function
 */
export const InitialColorDialog = () => {
  const { t } = useTranslation();
  const { primaryColor, initialize } = usePalette();
  const [color, setColor] = useState(primaryColor.copyWith({}));

  return (
    <div className="border-control-border flex flex-col gap-4 rounded border p-4">
      <OkTitle>{t('initial_setup.title')}</OkTitle>
      <RgbColorPicker initialColor={color} onColorChange={setColor} />
      <OkButton
        onClick={() => {
          initialize(t('color_names.primary').toLowerCase(), color);
        }}
      >
        {t('common.select')}
      </OkButton>
    </div>
  );
};
