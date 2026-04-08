import { OkButton, OkHueWheel, OkInput, OkLabel } from '@/components/ui';
import type { OkColor } from '@/domain/color';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CustomColorProps {
  initialColor: OkColor;
  onSubmit: (name: string, color: OkColor) => void;
}

export const CustomColor = ({ initialColor, onSubmit }: CustomColorProps) => {
  const { t } = useTranslation();

  const [color, setColor] = useState<OkColor>(initialColor);

  return (
    <div className="border-control-border flex flex-col items-center gap-2 border-b pb-4">
      <OkHueWheel
        value={color}
        onChange={(color) => setColor(color)}
        size={200}
      />
      <div className="flex flex-col">
        <OkLabel htmlFor="hue-input">{t('color_picker.hue')}</OkLabel>
        <OkInput
          id="hue-input"
          value={color.hue?.toFixed(1) ?? 0}
          onChange={(e) =>
            setColor(color.copyWith({ hue: Number(e.target.value) }))
          }
          type="number"
        />
      </div>
      <OkButton onClick={() => onSubmit('color', color)}>
        {t('palette.add_color')}
      </OkButton>
    </div>
  );
};
