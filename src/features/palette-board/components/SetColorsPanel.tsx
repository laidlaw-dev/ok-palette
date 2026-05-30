import { AnimatePresence, motion } from 'framer-motion';
import { SetColor } from './SetColor';
import type { GeneratedColorSet } from '@/stores/palette/palette-types';
import {
  asChroma,
  asLightness,
  OkColor,
  type Chroma,
  type Lightness,
} from '@/domain/color';
import { OkColorSlider, OkIconButton, OkInput, OkLabel } from '@/components/ui';
import { useState } from 'react';
import { CircleChevronDown, CircleX } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface SetColorsPanelProps {
  primaryColor: OkColor;
  colorSet: GeneratedColorSet;
  onAddColorClick: (setId: string, colorId: string) => void;
  onDeleteColorClick: (setId: string, colorId: string) => void;
  onLightnessChange: (lightness: Lightness) => void;
  onChromaChange: (chroma: Chroma) => void;
  onDeleteSet: (setId: string) => void;
}

export const SetColorsPanel = ({
  primaryColor,
  colorSet,
  onAddColorClick,
  onDeleteColorClick,
  onLightnessChange,
  onChromaChange,
  onDeleteSet,
}: SetColorsPanelProps) => {
  const [showControls, setShowControls] = useState(true);

  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-label font-[Open_Sans_Condensed] text-sm font-bold">
        {colorSet.name}
      </h4>
      <div className="flex items-center gap-1">
        <div className="w-8">
          <OkIconButton onClick={() => setShowControls((prev) => !prev)}>
            <CircleChevronDown
              className={clsx('h-6 w-6 cursor-pointer transition-transform', {
                'rotate-180': showControls,
              })}
            />
          </OkIconButton>
        </div>
        <AnimatePresence>
          {colorSet.colors.map((color) => (
            <motion.div
              key={color.id}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              layout
            >
              <SetColor
                name={color.name}
                color={color.color}
                isInUse={color.isInSet}
                onAddClick={() => onAddColorClick(colorSet.id, color.id)}
                onDeleteClick={() => onDeleteColorClick(colorSet.id, color.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            layout
            className="border-control-border border-b pb-2"
          >
            <ControlPanel
              primaryColor={primaryColor}
              colorSet={colorSet}
              onLightnessChange={onLightnessChange}
              onChromaChange={onChromaChange}
              onDeleteSet={onDeleteSet}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ControlPanelProps {
  primaryColor: OkColor;
  colorSet: GeneratedColorSet;
  onLightnessChange: (lightness: Lightness) => void;
  onChromaChange: (chroma: Chroma) => void;
  onDeleteSet: (setId: string) => void;
}

const ControlPanel = ({
  primaryColor,
  colorSet,
  onLightnessChange,
  onChromaChange,
  onDeleteSet,
}: ControlPanelProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-4 pt-2">
      <OKLCHColorSlider
        label={t('color_pickers.lightness')}
        value={colorSet.lightness}
        onChange={(value) => onLightnessChange(asLightness(value))}
        startColor={primaryColor.copyWith({
          lightness: 0,
          harmonizedChroma: colorSet.chroma,
        })}
        endColor={primaryColor.copyWith({
          lightness: 1,
          harmonizedChroma: colorSet.chroma,
        })}
      />
      <OKLCHColorSlider
        label={t('color_pickers.chroma')}
        value={colorSet.chroma}
        onChange={(value) => onChromaChange(asChroma(value))}
        startColor={primaryColor.copyWith({
          lightness: colorSet.lightness,
          harmonizedChroma: 0,
        })}
        endColor={primaryColor.copyWith({
          lightness: colorSet.lightness,
          harmonizedChroma: colorSet.chroma,
        })}
      />
      <div className="flex flex-1 items-center justify-end self-end">
        <OkIconButton
          onClick={() => onDeleteSet(colorSet.id)}
          aria-label={t('color_set.delete_set')}
        >
          <CircleX className="h-6 w-6" />
        </OkIconButton>
      </div>
    </div>
  );
};

interface OKLCHColorSliderProps {
  label: string;
  startColor: OkColor;
  endColor: OkColor;
  value: number;
  onChange: (value: number) => void;
}

const OKLCHColorSlider = ({
  label,
  startColor,
  endColor,
  value,
  onChange,
}: OKLCHColorSliderProps) => {
  return (
    <div className="flex flex-col gap-1">
      <OkLabel htmlFor={label}>{label}</OkLabel>
      <div className="flex items-center gap-2 rounded">
        <OkColorSlider
          className="flex-1"
          type="range"
          step={0.001}
          min={0}
          max={1.0}
          value={value}
          onChange={(e) => onChange(parseFloat(e.currentTarget.value))}
          startColor={startColor}
          endColor={endColor}
        />
        <OkInput
          id={label}
          type="number"
          step={0.001}
          min={0}
          max={1.0}
          value={value.toFixed(3)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(parseFloat(e.target.value))
          }
        />
      </div>
    </div>
  );
};
