import { RgbColorPicker } from '@/components/color-pickers';
import { OkButton, OkTitle } from '@/components/ui';
import { OkColor } from '@/domain/color';
import { usePalette } from '@/stores/palette/usePalette';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const InitialColor = () => {
  const { t } = useTranslation();
  const [color, setColor] = useState(OkColor.fromRgb({ r: 0, g: 0.5, b: 0.8 }));
  const { initialize } = usePalette();
  return (
    <div className="border-control-border flex flex-col gap-4 rounded border p-4">
      <OkTitle>{t('initial_setup.title')}</OkTitle>
      <RgbColorPicker initialColor={color} onColorChange={setColor} />
      <OkButton
        onClick={() => {
          initialize({
            initalColor: color,
            paletteName: 'My Palette',
            colorName: 'My Color',
          });
        }}
      >
        {t('common.select')}
      </OkButton>
    </div>
  );
};
