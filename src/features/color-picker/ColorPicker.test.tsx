import { render, screen, fireEvent, within } from '@testing-library/react';
import { OkColor } from '@/domain/color';

const primary = new OkColor({
  lightness: 0.5,
  harmonizedChroma: 0.5,
  hue: 180,
});
const complementary = new OkColor({
  lightness: 0.5,
  harmonizedChroma: 0.5,
  hue: 0,
});

const mock_onAddColor = vi.fn();

vi.mock('@/stores/palette', () => ({
  usePalette: () => ({
    primaryColor: primary,
    generatedPalette: {
      allColors: [{ id: 'primary', name: 'Primary', color: primary }],
    },
    addColor: mock_onAddColor,
  }),
}));

import { ColorPicker } from './ColorPicker';

describe('ColorPicker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('adds custom color', () => {
    render(<ColorPicker />);

    const hueInput = screen.getByLabelText(
      /color_pickers.hue/i
    ) as HTMLInputElement;
    fireEvent.change(hueInput, { target: { value: '90' } });

    // Click the "Add Custom Color" button
    const addCustomColorButton = screen.getByRole('button', {
      name: 'color_pickers.add_color',
    });
    fireEvent.click(addCustomColorButton);

    // Fill in the color name and submit
    const dialog = screen.getByRole('dialog');

    const colorNameInput = within(dialog).getByLabelText(
      'color_pickers.color_name'
    );
    expect(colorNameInput).toHaveValue('color_names.color');

    fireEvent.change(colorNameInput, { target: { value: 'test_color' } });

    const submitButton = within(dialog).getByRole('button', {
      name: 'color_pickers.add_color',
    });
    fireEvent.click(submitButton);

    // Expect the addColor function to have been called with the new color name and color value
    expect(mock_onAddColor).toHaveBeenCalledWith(
      'test_color',
      expect.objectContaining({
        lightness: 0.5,
        harmonizedChroma: 0.5,
        hue: 90,
      })
    );
  });
  it('adds suggested color', () => {
    render(<ColorPicker />);

    const suggestedColorButton = screen.getByRole('button', {
      name: complementary.hex,
    });
    fireEvent.click(suggestedColorButton);

    // Fill in the color name and submit
    const dialog = screen.getByRole('dialog');

    const colorNameInput = within(dialog).getByLabelText(
      'color_pickers.color_name'
    );
    expect(colorNameInput).toHaveValue('color_names.complementary');

    fireEvent.change(colorNameInput, { target: { value: 'test_color' } });

    const submitButton = within(dialog).getByRole('button', {
      name: 'color_pickers.add_color',
    });
    fireEvent.click(submitButton);

    // Expect the addColor function to have been called with the new color name and color value
    expect(mock_onAddColor).toHaveBeenCalledWith(
      'test_color',
      expect.objectContaining({
        lightness: 0.5,
        harmonizedChroma: 0.5,
        hue: 0,
      })
    );
  });
});
