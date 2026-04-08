import { usePalette } from '@/stores/palette';
import { filterAvailableColors } from '../utils/filter-available-colors';
import { NewColorForm } from './NewColorForm';
import type { OkColor } from '@/domain/color/ok-color';
import { useState } from 'react';
import { OkDialog } from '@/components/ui/OkDialog';
import { useTranslation } from 'react-i18next';
import { SuggestedColors } from './SuggestedColors';
import { OkHueWheel, OkLabel } from '@/components/ui';
import { OkButton, OkInput, OkTitle } from '@/components/ui';

export const ColorPicker = () => {
  const { t } = useTranslation();

  const { addColor, generatedPalette } = usePalette();

  const [dialogData, setDialogData] = useState<{
    name: string;
    color: OkColor;
  } | null>(null);

  const [wheelColor, setWheelColor] = useState<OkColor>(
    generatedPalette.allColors[0]?.color
  );

  const primaryColor = generatedPalette.allColors[0]?.color;
  if (!primaryColor) {
    return null;
  }

  const colorGroups = filterAvailableColors(
    primaryColor,
    generatedPalette.allColors.map((c) => c.color)
  );

  const handleAddColor = (baseName: string, color: OkColor) => {
    setDialogData({ name: baseName, color });
  };

  const handleSubmitNewColor = (newName: string) => {
    if (dialogData) {
      addColor(newName, dialogData.color);
      setDialogData(null);
    }
  };

  return (
    <>
      <div className="border-control-border flex h-full min-h-0 w-62 flex-col gap-4 border-r p-2">
        <div className="border-control-border flex flex-col items-center gap-2 border-b pb-4">
          <OkHueWheel
            value={wheelColor}
            onChange={(color) => setWheelColor(color)}
          />
          <div className="flex flex-col">
            <OkLabel htmlFor="hue-input">{t('color_picker.hue')}</OkLabel>
            <OkInput
              id="hue-input"
              value={wheelColor.hue?.toFixed(1) ?? 0}
              onChange={(e) =>
                setWheelColor(
                  wheelColor.copyWith({ hue: Number(e.target.value) })
                )
              }
              type="number"
            />
          </div>
          <OkButton
            onClick={() => setDialogData({ name: 'color', color: wheelColor })}
          >
            {t('palette.add_color')}
          </OkButton>
        </div>
        <OkTitle>{t('color_picker.suggested_colors')}</OkTitle>
        <div className="flex-1 overflow-y-auto">
          <SuggestedColors
            colorGroups={colorGroups}
            onAddColor={handleAddColor}
          />
        </div>
      </div>
      <OkDialog isOpen={!!dialogData} onClose={() => setDialogData(null)}>
        <NewColorForm
          baseName={
            dialogData
              ? (t(`hue_names.${dialogData.name}`).toLowerCase() ??
                t(`hue_names.primary`))
              : ''
          }
          usedNames={generatedPalette.allColors.map(
            (c) => c.name ?? t(`hue_names.primary`)
          )}
          onClose={() => setDialogData(null)}
          onSubmit={handleSubmitNewColor}
        />
      </OkDialog>
    </>
  );
};
