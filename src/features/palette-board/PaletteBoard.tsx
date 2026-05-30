import { usePalette } from '@/stores/palette';
import { BaseColorsPanel } from './components/BaseColorsPanel';
import { SetColorsPanel } from './components/SetColorsPanel';
import { OkButton } from '@/components/ui';
import { OkDialog } from '@/components/ui/OkDialog';
import { NewColorSetForm } from './components/NewColorSetForm';
import { useState } from 'react';
import type { Chroma, Lightness } from '@/domain/color/color-types';
import { AnimatePresence, motion } from 'framer-motion';

export const PaletteBoard = () => {
  const {
    primaryColor,
    generatedPalette,
    removeColor,
    addColorSet,
    removeColorSet,
    addColorToSet,
    removeColorFromSet,
    setColorSetLightness,
    setColorSetChroma,
  } = usePalette();

  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <div className="relative flex h-full flex-col gap-4">
        <BaseColorsPanel
          colors={generatedPalette.allColors}
          onColorClick={removeColor}
        />
        <AnimatePresence>
          {generatedPalette.colorSets.map((colorSet) => (
            <motion.div
              key={colorSet.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              layout
            >
              <SetColorsPanel
                primaryColor={primaryColor}
                colorSet={colorSet}
                onAddColorClick={addColorToSet}
                onDeleteColorClick={removeColorFromSet}
                onLightnessChange={(lightness: Lightness) =>
                  setColorSetLightness(colorSet.id, lightness)
                }
                onChromaChange={(chroma: Chroma) =>
                  setColorSetChroma(colorSet.id, chroma)
                }
                onDeleteSet={removeColorSet}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        <OkButton
          className="absolute right-1 bottom-1"
          onClick={() => setShowDialog(true)}
        >
          Add Color Set
        </OkButton>
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
