import { AnimatePresence, motion } from 'framer-motion';
import { SetColor } from './SetColor';
import type { GeneratedColorSet } from '@/stores/palette/palette-types';

interface SetColorsPanelProps {
  colorSet: GeneratedColorSet;
  onAddColorClick: (setId: string, colorId: string) => void;
  onDeleteColorClick: (setId: string, colorId: string) => void;
}

export const SetColorsPanel = ({
  colorSet,
  onAddColorClick,
  onDeleteColorClick,
}: SetColorsPanelProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-label font-[Open_Sans_Condensed] text-sm font-bold">
        {colorSet.name}
      </h4>
      <div className="flex gap-1">
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
    </div>
  );
};
