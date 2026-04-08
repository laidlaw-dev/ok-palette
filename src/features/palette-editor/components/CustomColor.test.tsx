import { OkColor } from '@/domain/color';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomColor } from './CustomColor';

describe('CustomColor', () => {
  it('calls onSubmit with color adjusted by input when the button is clicked', () => {
    const initialColor = new OkColor({
      lightness: 0.8,
      harmonizedChroma: 0.8,
      hue: 180,
    });
    const mock_onSubmit = vi.fn();
    render(
      <CustomColor initialColor={initialColor} onSubmit={mock_onSubmit} />
    );

    const hueInput = screen.getByLabelText(
      /color_picker.hue/i
    ) as HTMLInputElement;
    fireEvent.change(hueInput, { target: { value: '90' } });

    const submitButton = screen.getByRole('button', {
      name: /palette.add_color/i,
    });
    fireEvent.click(submitButton);

    expect(mock_onSubmit).toHaveBeenCalledWith(
      'color',
      expect.objectContaining({
        lightness: 0.8,
        harmonizedChroma: 0.8,
        hue: 90,
      })
    );
  });
  it('calls onSubmit with color adjusted by slider when the button is clicked', () => {
    const initialColor = new OkColor({
      lightness: 0.8,
      harmonizedChroma: 0.8,
      hue: 180,
    });
    const mock_onSubmit = vi.fn();
    render(
      <CustomColor initialColor={initialColor} onSubmit={mock_onSubmit} />
    );

    const hueWheelElement = screen.getByRole('slider');
    vi.spyOn(hueWheelElement, 'getBoundingClientRect').mockReturnValue({
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      right: 100,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    fireEvent.mouseDown(hueWheelElement, { clientX: 95, clientY: 50 });

    const submitButton = screen.getByRole('button', {
      name: /palette.add_color/i,
    });
    fireEvent.click(submitButton);

    expect(mock_onSubmit).toHaveBeenCalledWith(
      'color',
      expect.objectContaining({
        lightness: 0.8,
        harmonizedChroma: 0.8,
        hue: 90,
      })
    );
  });
});
