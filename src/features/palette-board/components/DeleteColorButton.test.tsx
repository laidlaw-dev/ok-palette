import { render, screen, fireEvent } from '@testing-library/react';
import { OkColor } from '@/domain/color';

import { DeleteColorButton } from './DeleteColorButton';

describe('DeleteColorButton', () => {
  it('renders the DeleteColorButton component with color', () => {
    const color = OkColor.fromHex('#ff0000');

    render(<DeleteColorButton color={color} onClick={() => {}} />);

    expect(screen.getByRole('button')).toHaveStyle(
      `background-color: ${color.css}`
    );
  });

  it('calls onClick when the button is clicked', () => {
    const color = OkColor.fromHex('#ff0000');
    const mock_onClick = vi.fn();

    render(<DeleteColorButton color={color} onClick={mock_onClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(mock_onClick).toHaveBeenCalled();
  });
});
