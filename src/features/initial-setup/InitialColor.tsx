import { RgbColorPicker } from '@/components/color-pickers';
import { OkButton, OkTitle } from '@/components/ui';
import { OkColor } from '@/domain/color';
import { useTranslation } from 'react-i18next';

export const InitialColor = () => {
  const { t } = useTranslation();
  return (
    <div className="border-control-border flex flex-col gap-4 rounded border p-4">
      <OkTitle>{t('initial_setup.title')}</OkTitle>
      <RgbColorPicker
        initialColor={OkColor.fromRgb({ r: 0, g: 0.5, b: 0.8 })}
        onColorChange={() => {}}
      />
      <OkButton onClick={() => {}}>{t('common.select')}</OkButton>
    </div>
  );
};
