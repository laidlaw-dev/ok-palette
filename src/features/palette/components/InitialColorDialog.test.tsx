import { render, screen, fireEvent } from '@testing-library/react';
import { OkColor } from '@/domain/color/ok-color';

import { InitialColorDialog } from './InitialColorDialog';

const mock_initialize = vi.fn();
vi.mock('@/stores/palette/usePalette', () => ({
  usePalette: () => ({
    initialize: (color: OkColor) => mock_initialize(color),
  }),
}));

describe('InitialColorDialog', () => {
  it('calls initialize with the selected color when the select button is clicked', () => {
    render(<InitialColorDialog />);

    const newColor = OkColor.fromHex('#8797a7');
    const hexInput = screen.getByLabelText(/hex/i) as HTMLInputElement;
    fireEvent.change(hexInput, { target: { value: newColor.hex } });

    const selectButton = screen.getByRole('button', { name: /common.select/i });
    fireEvent.click(selectButton);

    expect(mock_initialize).toHaveBeenCalledWith(
      expect.objectContaining({
        lightness: newColor.lightness,
        hue: newColor.hue,
        harmonizedChroma: newColor.harmonizedChroma,
      })
    );
  });
});
