import { render, screen, fireEvent } from '@testing-library/react';

import { BaseColor } from './BaseColor';
import { OkColor } from '@/domain/color';

const color = new OkColor({
  lightness: 0.7,
  harmonizedChroma: 0.8,
  hue: 120,
});

describe('BaseColor', () => {
  it('renders the BaseColor component', () => {
    render(<BaseColor name="test_color" color={color} onClick={() => {}} />);

    expect(screen.getByText('test_color')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveStyle(
      `background-color: ${color.css}`
    );
  });
  it('calls onClick when the component is clicked', () => {
    const mock_onClick = vi.fn();
    render(
      <BaseColor name="test_color" color={color} onClick={mock_onClick} />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(mock_onClick).toHaveBeenCalled();
  });
});
