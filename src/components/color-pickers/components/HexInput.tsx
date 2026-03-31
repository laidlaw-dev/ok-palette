import { OkInput } from '@/components/ui/OkInput';
import { isValidOpaqueHex } from '@/domain/color';
import { useState } from 'react';

interface HexInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
}

export const HexInput = ({ id, value, onChange }: HexInputProps) => {
  const [current, setCurrent] = useState<{ value: string; isValid: boolean }>(
    () => ({ value, isValid: isValidOpaqueHex(value) })
  );

  const handleCurrentChange = (newCurrent: string) => {
    const isValid = isValidOpaqueHex(newCurrent);
    setCurrent({ value: newCurrent, isValid });
    if (isValid) {
      onChange(newCurrent);
    }
  };

  return (
    <>
      <OkInput
        id={id}
        type="text"
        value={current.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleCurrentChange(e.currentTarget.value);
        }}
        invalid={!current.isValid}
      />
    </>
  );
};
