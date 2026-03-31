import type { OkColor } from '@/domain/color';
import clsx from 'clsx';
import styles from './sliders.module.css';

interface OkColorSliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startColor: OkColor;
  endColor: OkColor;
}

export const OkColorSlider = ({
  startColor,
  endColor,
  ...props
}: OkColorSliderProps) => {
  const linearGradient = `linear-gradient(to right, ${startColor.css} 0%, ${endColor.css} 100%)`;

  return (
    <div className="relative mx-2 flex h-8 items-center">
      <div
        className="absolute top-1/2 -left-2 h-8 w-8 -translate-y-1/2 rounded-l-full"
        aria-hidden="true"
        style={{ backgroundColor: startColor.css }}
      />
      <div
        className="absolute top-1/2 -right-2 h-8 w-8 -translate-y-1/2 rounded-r-full"
        aria-hidden="true"
        style={{ backgroundColor: endColor.css }}
      />
      <div
        className="absolute top-1/2 right-0 left-0 z-1 h-8 -translate-y-1/2 px-2"
        aria-hidden="true"
      >
        <div className="h-full w-full" style={{ background: linearGradient }} />
      </div>
      <input
        {...props}
        className={clsx(
          'relative z-10 h-8 w-full appearance-none bg-transparent outline-none',
          styles.sliderThumb
        )}
      />
    </div>
  );
};
