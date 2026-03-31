import { hexToRgb, OkColor, rgbToHex, type OkRGB } from '@/domain/color';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HexInput } from './components/HexInput';
import { OkInput } from '../ui';

interface RgbColorPickerProps {
  initialColor: OkColor;
  onColorChange: (color: OkColor) => void;
}

interface RgbColorPickerState {
  hex: string;
  rgb: OkRGB;
  hexKey: string;
}

type RgbChannel = keyof OkRGB;

export const RgbColorPicker = ({
  initialColor,
  onColorChange,
}: RgbColorPickerProps) => {
  const { t } = useTranslation();

  const [currentColor, setCurrentColor] = useState<RgbColorPickerState>({
    hex: initialColor.hex,
    rgb: initialColor.rgb,
    hexKey: initialColor.hex, // Used to force re-mount of HexColorInput when hex changes
  });

  const handleHexChange = (newHex: string) => {
    setCurrentColor((state) => ({
      ...state,
      hex: newHex,
      rgb: hexToRgb(newHex),
    }));
    const newColor = OkColor.fromHex(newHex);
    onColorChange(newColor);
  };

  const handleRgbChange = (channel: RgbChannel, newValue: number) => {
    const newRgb = { ...currentColor.rgb, [channel]: newValue };
    const newHex = rgbToHex(newRgb);
    setCurrentColor((state) => ({
      ...state,
      hex: newHex,
      rgb: newRgb,
      hexKey: newHex, // Force re-mount of HexColorInput to reset its internal state
    }));
    const newColor = OkColor.fromRgb(newRgb);
    onColorChange(newColor);
  };

  return (
    <div className="flex items-stretch gap-4">
      <div
        className="w-24 rounded"
        style={{ backgroundColor: currentColor.hex }}
        role="img"
        aria-label={t('color_picker.current_color')}
      />
      <div className="flex w-96 flex-col gap-4">
        <form>
          <div className="flex flex-col">
            <label htmlFor="hex-input">{t('color_picker.hex')}</label>
            <HexInput
              key={currentColor.hexKey} // Force re-mount to reset internal state when hex changes
              id="hex-input"
              value={currentColor.hex}
              onChange={(newHex) => handleHexChange(newHex)}
            />
          </div>
          <RgbSlider
            label={t('color_picker.red')}
            channel="r"
            value={currentColor.rgb.r}
            onChange={handleRgbChange}
          />
          <RgbSlider
            label={t('color_picker.green')}
            channel="g"
            value={currentColor.rgb.g}
            onChange={handleRgbChange}
          />
          <RgbSlider
            label={t('color_picker.blue')}
            channel="b"
            value={currentColor.rgb.b}
            onChange={handleRgbChange}
          />
        </form>
      </div>
    </div>
  );
};

interface RgbSliderProps {
  label: string;
  channel: RgbChannel;
  value: number;
  onChange: (channel: RgbChannel, value: number) => void;
}

const RgbSlider = ({ label, channel, value, onChange }: RgbSliderProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={`${channel}-input`}>{label}</label>
      <div className="flex gap-2">
        <div className="relative mx-2 flex h-8 w-full items-center">
          <input
            type="range"
            min="0"
            max="255"
            value={Math.round(value * 255)}
            aria-label={label}
            onChange={(e) =>
              onChange(channel, parseInt(e.target.value, 10) / 255)
            }
          />
        </div>
        <OkInput
          type="number"
          id={`${channel}-input`}
          min="0"
          max="255"
          value={Math.round(value * 255)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(channel, parseInt(e.target.value, 10) / 255)
          }
        />
      </div>
    </div>
  );
};
