import { useTranslation } from 'react-i18next';
import type { AvailableColorGroup } from '../utils/filter-available-colors';
import type { OkColor } from '@/domain/color/ok-color';
import { OkColorButton, OkLabel } from '@/components/ui';
import { AnimatePresence, motion } from 'framer-motion';

interface SuggestedColorsProps {
  colorGroups: AvailableColorGroup[];
  onAddColor: (key: string, color: OkColor) => void;
}

const complementaryKeys = ['complementary', 'split', 'triadic', 'analogous'];

const achromaticKeys = ['achromatic'];

interface ColorGroupSection {
  key: string;
  groups: AvailableColorGroup[];
}

export const SuggestedColors = ({
  colorGroups,
  onAddColor,
}: SuggestedColorsProps) => {
  const { t } = useTranslation();

  const complements = colorGroups.filter(
    (group) => complementaryKeys.includes(group.key) && group.colors.length > 0
  );
  const achromatic = colorGroups.filter(
    (group) => achromaticKeys.includes(group.key) && group.colors.length > 0
  );
  const hues = colorGroups.filter(
    (group) =>
      !complementaryKeys.includes(group.key) &&
      !achromaticKeys.includes(group.key) &&
      group.colors.length > 0
  );

  const colorGroupSections: ColorGroupSection[] = [
    { key: t('color_names.complements'), groups: complements },
    { key: t('color_names.achromatic'), groups: achromatic },
    { key: t('color_names.hues'), groups: hues },
  ].filter((section) => section.groups.length > 0);

  return (
    <div className="flex flex-col gap-2 px-2">
      <ColorGroup sections={colorGroupSections} onAddColor={onAddColor} />
    </div>
  );
};

interface ColorGroupProps {
  sections: ColorGroupSection[];
  onAddColor: (key: string, color: OkColor) => void;
}

const ColorGroup = ({ sections, onAddColor }: ColorGroupProps) => {
  return (
    <AnimatePresence>
      {sections.map((section) => (
        <motion.div key={section.key} exit={{ opacity: 0, scaleY: 0 }} layout>
          <OkLabel>{section.key}</OkLabel>
          <div className="flex flex-col gap-1">
            {section.groups.map((group) => (
              <div className="flex gap-1" key={group.key}>
                <AnimatePresence>
                  {group.colors.map((color) => (
                    <motion.div
                      key={color.hue}
                      exit={{ opacity: 0, scaleY: 0 }}
                      layout
                    >
                      <OkColorButton
                        key={color.hue}
                        color={color}
                        onClick={() => onAddColor(group.key, color)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};
