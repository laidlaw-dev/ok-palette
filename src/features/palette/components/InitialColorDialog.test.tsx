import { render, screen, fireEvent } from '@testing-library/react';
import { OkColor } from '@/domain/color/ok-color';

import { InitialColorDialog } from './InitialColorDialog';

const mock_initialize = vi.fn();
vi.mock('@/stores/palette/usePalette', () => ({
  usePalette: () => ({
    primaryColor: OkColor.fromHex('#05b2e5'),
    initialize: (name: string, color: OkColor) => mock_initialize(name, color),
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
      'color_names.primary',
      expect.objectContaining({
        lightness: newColor.lightness,
        hue: newColor.hue,
        harmonizedChroma: newColor.harmonizedChroma,
      })
    );
  });
});
