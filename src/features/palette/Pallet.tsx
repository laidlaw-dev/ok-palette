import { AnimatePresence, motion } from 'framer-motion';
import { usePalette } from '@/stores/palette';
import { InitialColorDialog } from './components/InitialColorDialog';
import { PaletteEditor } from '../palette-editor/PaletteEditor';

export const Palette = () => {
  const { isInitialized } = usePalette();

  return (
    <div className="relative h-full w-full p-2">
      <AnimatePresence mode="sync">
        {!isInitialized ? (
          <motion.div
            key="initial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <InitialColorDialog />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0">
              <PaletteEditor />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
