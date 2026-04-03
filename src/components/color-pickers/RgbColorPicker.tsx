import { hexToRgb, OkColor, rgbToHex, type OkRGB } from '@/domain/color';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HexInput } from './components/HexInput';
import { OkInput, OkLabel, OkColorSlider } from '../ui';

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
        className="border-control-border w-24 rounded border"
        style={{ backgroundColor: currentColor.hex }}
        role="img"
        aria-label={t('color_picker.current_color')}
      />
      <div className="flex w-96 flex-col gap-4">
        <div className="flex flex-col">
          <OkLabel htmlFor="hex-input">{t('color_picker.hex')}</OkLabel>
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
  const startColor = OkColor.fromRgb({
    r: 0,
    g: 0,
    b: 0,
  });

  const endColor = OkColor.fromRgb({
    r: channel === 'r' ? 1 : 0,
    g: channel === 'g' ? 1 : 0,
    b: channel === 'b' ? 1 : 0,
  });

  return (
    <div className="flex flex-col">
      <OkLabel htmlFor={`${channel}-input`}>{label}</OkLabel>
      <div className="flex gap-2">
        <div className="flex-1">
          <OkColorSlider
            startColor={startColor}
            endColor={endColor}
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
