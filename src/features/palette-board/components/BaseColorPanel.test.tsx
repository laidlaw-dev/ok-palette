import { render, screen, fireEvent } from '@testing-library/react';
import { OkColor } from '@/domain/color';

import { BaseColorsPanel } from './BaseColorsPanel';

const colors = [
  {
    name: 'test_color_1',
    color: new OkColor({
      lightness: 0.7,
      harmonizedChroma: 0.8,
      hue: 120,
    }),
    id: 'color1',
  },
  {
    name: 'test_color_2',
    color: new OkColor({
      lightness: 0.5,
      harmonizedChroma: 0.6,
      hue: 240,
    }),
    id: 'color2',
  },
];

describe('BaseColorsPanel', () => {
  it('renders the BaseColorsPanel component', () => {
    render(<BaseColorsPanel colors={colors} onColorClick={() => {}} />);

    expect(screen.getByText('test_color_1')).toBeInTheDocument();
    expect(screen.getByText('test_color_2')).toBeInTheDocument();
  });

  it('calls onColorClick when a color is clicked', () => {
    const mock_onColorClick = vi.fn();
    render(
      <BaseColorsPanel colors={colors} onColorClick={mock_onColorClick} />
    );

    fireEvent.click(screen.getByRole('button', { name: 'test_color_1' }));
    expect(mock_onColorClick).toHaveBeenCalledWith('color1');

    fireEvent.click(screen.getByRole('button', { name: 'test_color_2' }));
    expect(mock_onColorClick).toHaveBeenCalledWith('color2');
  });
});
