import { render, screen, fireEvent } from '@testing-library/react';
import { asChroma, asLightness, OkColor } from '@/domain/color';

import { SetColorsPanel } from './SetColorsPanel';

const color_1 = OkColor.fromHex('#ff0000');
const color_2 = OkColor.fromHex('#00ff00');

const color_set = {
  id: '1',
  name: 'Test Set',
  colors: [
    {
      id: 'c1',
      name: 'Color 1',
      color: color_1,
      isInSet: true,
    },
    {
      id: 'c2',
      name: 'Color 2',
      color: color_2,
      isInSet: false,
    },
  ],
  lightness: asLightness(0.5),
  chroma: asChroma(0.5),
};

describe('SetColorsPanel', () => {
  const onAddColorClick = vi.fn();
  const onDeleteColorClick = vi.fn();
  const onLightnessChange = vi.fn();
  const onChromaChange = vi.fn();
  const onDeleteSet = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the SetColorsPanel component with color set name and colors', () => {
    render(
      <SetColorsPanel
        primaryColor={OkColor.fromHex('#ff0000')}
        colorSet={color_set}
        onAddColorClick={onAddColorClick}
        onDeleteColorClick={onDeleteColorClick}
        onLightnessChange={onLightnessChange}
        onChromaChange={onChromaChange}
        onDeleteSet={onDeleteSet}
      />
    );

    expect(screen.getByText('Test Set')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: color_1.hex })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: color_2.hex })
    ).toBeInTheDocument();
  });

  it('calls onAddColorClick when an unused color is clicked', () => {
    render(
      <SetColorsPanel
        primaryColor={OkColor.fromHex('#ff0000')}
        colorSet={color_set}
        onAddColorClick={onAddColorClick}
        onDeleteColorClick={onDeleteColorClick}
        onLightnessChange={onLightnessChange}
        onChromaChange={onChromaChange}
        onDeleteSet={onDeleteSet}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: color_2.hex }));
    expect(onAddColorClick).toHaveBeenCalledWith(color_set.id, 'c2');
  });

  it('calls onDeleteColorClick when a used color is clicked', () => {
    render(
      <SetColorsPanel
        primaryColor={OkColor.fromHex('#ff0000')}
        colorSet={color_set}
        onAddColorClick={onAddColorClick}
        onDeleteColorClick={onDeleteColorClick}
        onLightnessChange={onLightnessChange}
        onChromaChange={onChromaChange}
        onDeleteSet={onDeleteSet}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: color_1.hex }));
    expect(onDeleteColorClick).toHaveBeenCalledWith(color_set.id, 'c1');
  });

  it('calls onLightnessChange when the lightness slider is changed', () => {
    render(
      <SetColorsPanel
        primaryColor={OkColor.fromHex('#ff0000')}
        colorSet={color_set}
        onAddColorClick={onAddColorClick}
        onDeleteColorClick={onDeleteColorClick}
        onLightnessChange={onLightnessChange}
        onChromaChange={onChromaChange}
        onDeleteSet={onDeleteSet}
      />
    );

    fireEvent.change(screen.getByLabelText('color_pickers.lightness'), {
      target: { value: 0.7 },
    });
    expect(onLightnessChange).toHaveBeenCalledWith(0.7);
  });

  it('calls onChromaChange when the chroma slider is changed', () => {
    render(
      <SetColorsPanel
        primaryColor={OkColor.fromHex('#ff0000')}
        colorSet={color_set}
        onAddColorClick={onAddColorClick}
        onDeleteColorClick={onDeleteColorClick}
        onLightnessChange={onLightnessChange}
        onChromaChange={onChromaChange}
        onDeleteSet={onDeleteSet}
      />
    );

    fireEvent.change(screen.getByLabelText('color_pickers.chroma'), {
      target: { value: 0.8 },
    });
    expect(onChromaChange).toHaveBeenCalledWith(0.8);
  });

  it('calls onDeleteSet when the delete set button is clicked', () => {
    render(
      <SetColorsPanel
        primaryColor={OkColor.fromHex('#ff0000')}
        colorSet={color_set}
        onAddColorClick={onAddColorClick}
        onDeleteColorClick={onDeleteColorClick}
        onLightnessChange={onLightnessChange}
        onChromaChange={onChromaChange}
        onDeleteSet={onDeleteSet}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'color_set.delete_set' })
    );
    expect(onDeleteSet).toHaveBeenCalledWith(color_set.id);
  });
});
