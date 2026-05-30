import {
  OkButton,
  OkInput,
  OkLabel,
  OkListbox,
  OkTitle,
  OkValidationMessage,
} from '@/components/ui';
import { suggestName } from '@/domain/names/suggest-name';
import { validateName } from '@/domain/names/validate-name';
import type { ColorSetType } from '@/stores/palette';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface NewColorSetFormProps {
  usedNames: string[];
  onSubmit: (name: string, type: ColorSetType) => void;
  onClose: () => void;
}

interface NewColorSetNameState {
  name: string;
  touched: boolean;
  error: string | null;
}

export const NewColorSetForm = ({
  usedNames,
  onSubmit,
  onClose,
}: NewColorSetFormProps) => {
  const { t } = useTranslation();

  const [type, setType] = useState<ColorSetType>('default');
  const [nameState, setNameState] = useState<NewColorSetNameState>({
    name: suggestName(t('color_set_types.default'), usedNames),
    touched: false,
    error: null,
  });

  const handleTypeChange = (newType: ColorSetType) => {
    setType(newType);
    if (!nameState.touched) {
      setNameState({
        name: suggestName(t(`color_set_types.${newType}`), usedNames),
        touched: false,
        error: null,
      });
    }
  };

  const handleSubmit = () => {
    const newName = nameState.name;
    // Handle the new color name submission
    if (validateName(newName, usedNames)) {
      // Add the new color to the palette
      onSubmit(newName, type);
    } else {
      if (newName.trim() === '') {
        setNameState({ ...nameState, error: t('validation.required_name') });
      } else {
        setNameState({ ...nameState, error: t('validation.unique_name') });
      }
    }
  };

  const colorSetTypeOptions: { value: ColorSetType; label: string }[] = [
    { value: 'default', label: t('color_set_types.default') },
    { value: 'text', label: t('color_set_types.text') },
    { value: 'surface', label: t('color_set_types.surface') },
    { value: 'border', label: t('color_set_types.border') },
  ];

  return (
    <div className="flex flex-col gap-4">
      <OkTitle>{t('color_set.add_color_set')}</OkTitle>
      <div className="flex flex-col justify-start gap-1">
        <OkLabel htmlFor="color-set-name">{t('color_set.name')}</OkLabel>
        <OkInput
          id="color-set-name"
          placeholder={t('color_set.name')}
          value={nameState.name}
          onChange={(e) =>
            setNameState({ ...nameState, name: e.target.value, touched: true })
          }
        />
        {nameState.error && <OkValidationMessage message={nameState.error} />}
        <OkLabel htmlFor="color-set-type">{t('color_set.type')}</OkLabel>
        <OkListbox
          id="color-set-type"
          value={type}
          onChange={handleTypeChange}
          options={colorSetTypeOptions}
        />
      </div>
      <div className="flex justify-end gap-4 pt-2">
        <OkButton onClick={onClose}>{t('common.cancel')}</OkButton>
        <OkButton onClick={handleSubmit}>
          {t('color_set.add_color_set')}
        </OkButton>
      </div>
    </div>
  );
};
