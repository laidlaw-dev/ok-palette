import type { OkColor } from '@/domain/color';
import { BaseColor } from './BaseColor';
import { AnimatePresence, motion } from 'framer-motion';

interface BaseColorsPanelProps {
  colors: { name: string; color: OkColor; id: string }[];
  onColorClick: (colorId: string) => void;
}

export const BaseColorsPanel = ({
  colors,
  onColorClick,
}: BaseColorsPanelProps) => {
  return (
    <div className="flex gap-1">
      <div className="w-8" />
      <AnimatePresence>
        {colors.map((color) => (
          <motion.div
            key={color.id}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            layout
          >
            <BaseColor
              name={color.name}
              color={color.color}
              onClick={() => onColorClick(color.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
