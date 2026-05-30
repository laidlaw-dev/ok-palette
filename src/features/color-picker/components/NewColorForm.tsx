import {
  OkButton,
  OkInput,
  OkLabel,
  OkTitle,
  OkValidationMessage,
} from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { suggestColorName, validateColorName } from '../utils/color-names';
import { useRef, useState } from 'react';

interface NewColorFormProps {
  baseName: string;
  usedNames: string[];
  onSubmit: (newName: string) => void;
  onClose: () => void;
}

export const NewColorForm = ({
  baseName,
  usedNames,
  onSubmit,
  onClose,
}: NewColorFormProps) => {
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const suggestedName = suggestColorName(baseName, usedNames);

  const handleSubmit = () => {
    if (inputRef.current) {
      const newName = inputRef.current.value;
      // Handle the new color name submission
      if (validateColorName(newName, usedNames)) {
        // Add the new color to the palette
        onSubmit(newName);
      } else {
        if (newName.trim() === '') {
          setError(t('validation.required_name'));
        } else {
          setError(t('validation.unique_name'));
        }
      }
    }
  };

  const handleChange = () => {
    if (inputRef.current) {
      const newName = inputRef.current.value;
      if (error && validateColorName(newName, usedNames)) {
        setError(null);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <OkTitle>{t('color_pickers.add_color')}</OkTitle>
      <div className="flex flex-col gap-1">
        <OkLabel htmlFor="color-name">{t('color_pickers.color_name')}</OkLabel>
        <OkInput
          ref={inputRef}
          id="color-name"
          defaultValue={suggestedName}
          invalid={!!error}
          onChange={handleChange}
          autoFocus
        />
        {error && <OkValidationMessage message={error} />}
      </div>
      <div className="flex justify-end gap-4 pt-2">
        <OkButton onClick={onClose}>{t('common.cancel')}</OkButton>
        <OkButton onClick={handleSubmit}>
          {t('color_pickers.add_color')}
        </OkButton>
      </div>
    </div>
  );
};
