import type { OkColor } from '@/domain/color';
import { useTranslation } from 'react-i18next';

interface FixedColorSwatchProps {
  color: OkColor;
  name?: string;
}

export const FixedColorSwatch = ({ color, name }: FixedColorSwatchProps) => {
  const { t } = useTranslation();

  const displayName = name || t('palette.default_color_name');
  return (
    <div className="flex w-14 flex-col items-center gap-1">
      <div className="text-label max-w-full truncate text-xs">
        {displayName}
      </div>
      <div
        className="h-6 w-full rounded"
        style={{ backgroundColor: color.css }}
      />
    </div>
  );
};
