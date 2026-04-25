import { usePalette } from '@/stores/palette';
import { BaseColorsPanel } from './components/BaseColorsPanel';
import { SetColorsPanel } from './components/SetColorsPanel';
import { OkButton } from '@/components/ui';
import { OkDialog } from '@/components/ui/OkDialog';
import { NewColorSetForm } from './components/NewColorSetForm';
import { useState } from 'react';

export const PaletteBoard = () => {
  const {
    generatedPalette,
    removeColor,
    addColorSet,
    addColorToSet,
    removeColorFromSet,
  } = usePalette();

  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-4">
        <BaseColorsPanel
          colors={generatedPalette.allColors}
          onColorClick={removeColor}
        />
        {generatedPalette.colorSets.map((colorSet) => (
          <SetColorsPanel
            key={colorSet.id}
            colorSet={colorSet}
            onAddColorClick={addColorToSet}
            onDeleteColorClick={removeColorFromSet}
          />
        ))}
        <OkButton onClick={() => setShowDialog(true)}>Add Color Set</OkButton>
      </div>
      <OkDialog isOpen={showDialog} onClose={() => setShowDialog(false)}>
        <NewColorSetForm
          usedNames={generatedPalette.colorSets.map((set) => set.name)}
          onClose={() => setShowDialog(false)}
          onSubmit={(name, type) => {
            addColorSet(name, type);
            setShowDialog(false);
          }}
        />
      </OkDialog>
    </>
  );
};
