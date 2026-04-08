import type { OkColor } from '@/domain/color';
import { useEffect, useState } from 'react';
import styles from './sliders.module.css';

interface OkHueWheelProps {
  value: OkColor;
  onChange: (color: OkColor) => void;
  size?: number;
  disabled?: boolean;
}
export const OkHueWheel = ({
  value,
  onChange,
  size = 200,
  disabled = false,
}: OkHueWheelProps) => {
  const thumbSize = 32;

  const [isDragging, setIsDragging] = useState(false);

  const getHueFromPosition = (
    boundingRect: DOMRect,
    clientX: number,
    clientY: number
  ): number => {
    const rect = boundingRect;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const { angle } = cartesianToPolar(centerX, centerY, clientX, clientY);

    return angle;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    if (disabled) return;
    setIsDragging(true);
    const hue = getHueFromPosition(rect, e.clientX, e.clientY);
    onChange(value.copyWith({ hue: hue }));
  };

  const handleMouseUp = (_e: React.MouseEvent) => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    if (disabled) return;
    if (!isDragging) return;
    const hue = getHueFromPosition(rect, e.clientX, e.clientY);
    onChange(value.copyWith({ hue: hue }));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    console.log('TouchStart event:', e.target);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    console.log('TouchMove event:', e.target);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    console.log('TouchEnd event:', e.target);
  };

  // Add global mouse up listener
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchend', handleGlobalMouseUp);
    }
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging]);

  const handleInsetEvent = (e: React.MouseEvent) => {
    setIsDragging(false);
    e.stopPropagation();
  };

  const { x, y } = polarToCartesian(
    size / 2,
    size / 2,
    size / 2 - thumbSize / 2,
    value.hue || 0
  );

  const conicGradient = (() => {
    const segments = 12;
    const gradientSegments = [];
    for (let i = 0; i < segments; i++) {
      const segementColor = value.copyWith({ hue: i * 30 });
      gradientSegments.push(`${segementColor.css} ${i * 30}deg`);
    }
    gradientSegments.push(`${value.copyWith({ hue: 360 }).css} 360deg`);
    return `conic-gradient(${gradientSegments.join(', ')})`;
  })();

  return (
    <div
      role="slider"
      className="relative rounded-full"
      style={{ width: size, height: size, backgroundImage: conicGradient }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={styles.wheelThumb}
        style={{
          zIndex: 1,
          left: x - (thumbSize - 4) / 2,
          top: y - (thumbSize - 4) / 2,
          width: thumbSize - 4,
          height: thumbSize - 4,
        }}
      />
      <div
        className="bg-background absolute inset-0 rounded-full"
        onMouseDown={handleInsetEvent}
        onMouseMove={handleInsetEvent}
        onMouseUp={handleInsetEvent}
        style={{
          left: thumbSize,
          top: thumbSize,
          right: thumbSize,
          bottom: thumbSize,
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            left: thumbSize,
            top: thumbSize,
            right: thumbSize,
            bottom: thumbSize,
            backgroundColor: value.css,
          }}
        />
      </div>
    </div>
  );
};

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const cartesianToPolar = (
  centerX: number,
  centerY: number,
  x: number,
  y: number
) => {
  const deltaX = x - centerX;
  const deltaY = y - centerY;
  const radius = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  let angleInDegrees = (Math.atan2(deltaY, deltaX) * 180) / Math.PI + 90;
  if (angleInDegrees < 0) {
    angleInDegrees += 360;
  }
  return { radius, angle: angleInDegrees };
};

/*const conicGradient = (() => {
    const segments = 360;
    const gradientSegments = [];
    for (let i = 0; i < segments; i++) {
      const segementColor = value.copyWith({ hue: i });
      gradientSegments.push(`${segementColor.css()} ${i}deg`);
    }
    return `conic-gradient(${gradientSegments.join(', ')})`;
  })();*/
