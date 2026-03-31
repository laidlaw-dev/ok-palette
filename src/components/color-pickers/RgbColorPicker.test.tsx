import { OkColor } from '@/domain/color';
import { render, screen, fireEvent } from '@testing-library/react';

import { RgbColorPicker } from './RgbColorPicker';

const MAX_CHANNEL_VALUE = 255;

describe('RgbColorPicker', () => {
  it('renders with initial value', () => {
    const initialColor = OkColor.fromHex('#aa2277');
    const initialRgb = initialColor.rgb;

    render(
      <RgbColorPicker initialColor={initialColor} onColorChange={() => {}} />
    );

    const colorPreview = screen.getByRole('img', {
      name: /color_picker.current_color/i,
    });
    expect(colorPreview).toHaveStyle(`background-color: ${initialColor.hex}`);

    const hexInput = screen.getByLabelText(/color_picker.hex/i);
    expect(hexInput).toHaveValue('#aa2277');

    const redInput = screen.getByRole('spinbutton', {
      name: /color_picker.red/i,
    });
    const greenInput = screen.getByRole('spinbutton', {
      name: /color_picker.green/i,
    });
    const blueInput = screen.getByRole('spinbutton', {
      name: /color_picker.blue/i,
    });

    expect(redInput).toHaveValue(Math.round(MAX_CHANNEL_VALUE * initialRgb.r));
    expect(greenInput).toHaveValue(
      Math.round(MAX_CHANNEL_VALUE * initialRgb.g)
    );
    expect(blueInput).toHaveValue(Math.round(MAX_CHANNEL_VALUE * initialRgb.b));

    const redSlider = screen.getByRole('slider', {
      name: /color_picker.red/i,
    });
    const greenSlider = screen.getByRole('slider', {
      name: /color_picker.green/i,
    });
    const blueSlider = screen.getByRole('slider', {
      name: /color_picker.blue/i,
    });

    expect(redSlider).toHaveValue(
      String(Math.round(MAX_CHANNEL_VALUE * initialRgb.r))
    );
    expect(greenSlider).toHaveValue(
      String(Math.round(MAX_CHANNEL_VALUE * initialRgb.g))
    );
    expect(blueSlider).toHaveValue(
      String(Math.round(MAX_CHANNEL_VALUE * initialRgb.b))
    );
  });
  it('updates Rgb inputs and calls onColorChange when hex input changes to valid hex', () => {
    const initialColor = OkColor.fromHex('#aa2277');
    const mock_onColorChange = vi.fn();

    render(
      <RgbColorPicker
        initialColor={initialColor}
        onColorChange={mock_onColorChange}
      />
    );

    const newHex = '#88aa77';
    const expectedRgb = OkColor.fromHex(newHex).rgb;

    const hexInput = screen.getByLabelText(/color_picker.hex/i);
    fireEvent.change(hexInput, { target: { value: newHex } });

    const colorPreview = screen.getByRole('img', {
      name: /color_picker.current_color/i,
    });
    expect(colorPreview).toHaveStyle(`background-color: ${newHex}`);

    const redInput = screen.getByRole('spinbutton', {
      name: /color_picker.red/i,
    });
    const greenInput = screen.getByRole('spinbutton', {
      name: /color_picker.green/i,
    });
    const blueInput = screen.getByRole('spinbutton', {
      name: /color_picker.blue/i,
    });

    expect(redInput).toHaveValue(Math.round(MAX_CHANNEL_VALUE * expectedRgb.r));
    expect(greenInput).toHaveValue(
      Math.round(MAX_CHANNEL_VALUE * expectedRgb.g)
    );
    expect(blueInput).toHaveValue(
      Math.round(MAX_CHANNEL_VALUE * expectedRgb.b)
    );

    expect(mock_onColorChange).toHaveBeenCalledWith(OkColor.fromHex(newHex));
  });
  it('updates Rgb inputs and calls onColorChange when hex input changes to valid 3 digit hex', () => {
    const initialColor = OkColor.fromHex('#aa2277');
    const mock_onColorChange = vi.fn();

    render(
      <RgbColorPicker
        initialColor={initialColor}
        onColorChange={mock_onColorChange}
      />
    );

    const newHex = '#8a7';
    const expectedRgb = OkColor.fromHex(newHex).rgb;

    const hexInput = screen.getByLabelText(/color_picker.hex/i);
    fireEvent.change(hexInput, { target: { value: newHex } });

    const colorPreview = screen.getByRole('img', {
      name: /color_picker.current_color/i,
    });
    expect(colorPreview).toHaveStyle(`background-color: ${newHex}`);

    const redInput = screen.getByRole('spinbutton', {
      name: /color_picker.red/i,
    });
    const greenInput = screen.getByRole('spinbutton', {
      name: /color_picker.green/i,
    });
    const blueInput = screen.getByRole('spinbutton', {
      name: /color_picker.blue/i,
    });

    expect(redInput).toHaveValue(Math.round(MAX_CHANNEL_VALUE * expectedRgb.r));
    expect(greenInput).toHaveValue(
      Math.round(MAX_CHANNEL_VALUE * expectedRgb.g)
    );
    expect(blueInput).toHaveValue(
      Math.round(MAX_CHANNEL_VALUE * expectedRgb.b)
    );

    expect(mock_onColorChange).toHaveBeenCalledWith(OkColor.fromHex(newHex));
  });
  it('does not update Rgb input call onColorChange when hex input changes to invalid hex', () => {
    const initialColor = OkColor.fromHex('#aa2277');
    const initialRgb = initialColor.rgb;

    const mock_onColorChange = vi.fn();

    render(
      <RgbColorPicker
        initialColor={initialColor}
        onColorChange={mock_onColorChange}
      />
    );

    const hexInput = screen.getByLabelText(/color_picker.hex/i);
    fireEvent.change(hexInput, { target: { value: 'invalid' } });

    const colorPreview = screen.getByRole('img', {
      name: /color_picker.current_color/i,
    });
    expect(colorPreview).toHaveStyle(`background-color: ${initialColor.hex}`);

    const redInput = screen.getByRole('spinbutton', {
      name: /color_picker.red/i,
    });
    const greenInput = screen.getByRole('spinbutton', {
      name: /color_picker.green/i,
    });
    const blueInput = screen.getByRole('spinbutton', {
      name: /color_picker.blue/i,
    });

    expect(redInput).toHaveValue(Math.round(MAX_CHANNEL_VALUE * initialRgb.r));
    expect(greenInput).toHaveValue(
      Math.round(MAX_CHANNEL_VALUE * initialRgb.g)
    );
    expect(blueInput).toHaveValue(Math.round(MAX_CHANNEL_VALUE * initialRgb.b));

    expect(mock_onColorChange).not.toHaveBeenCalled();
  });
  it('updates hex input and calls onColorChange when red input changes', () => {
    const initialColor = OkColor.fromHex('#aa2277');
    const mock_onColorChange = vi.fn();

    render(
      <RgbColorPicker
        initialColor={initialColor}
        onColorChange={mock_onColorChange}
      />
    );

    const redInput = screen.getByRole('spinbutton', {
      name: /color_picker.red/i,
    });

    fireEvent.change(redInput, { target: { value: 128 } });

    const expectedHex = '#802277';

    const colorPreview = screen.getByRole('img', {
      name: /color_picker.current_color/i,
    });
    expect(colorPreview).toHaveStyle(`background-color: ${expectedHex}`);

    const hexInput = screen.getByLabelText(/color_picker.hex/i);
    expect(hexInput).toHaveValue(expectedHex);

    const redSlider = screen.getByRole('slider', {
      name: /color_picker.red/i,
    });

    expect(redSlider).toHaveValue(String(128));

    expect(mock_onColorChange).toHaveBeenCalledWith(
      OkColor.fromHex(expectedHex)
    );
  });
  it('updates hex input and calls onColorChange when green input changes', () => {
    const initialColor = OkColor.fromHex('#aa2277');
    const mock_onColorChange = vi.fn();

    render(
      <RgbColorPicker
        initialColor={initialColor}
        onColorChange={mock_onColorChange}
      />
    );

    const greenInput = screen.getByRole('spinbutton', {
      name: /color_picker.green/i,
    });

    fireEvent.change(greenInput, { target: { value: 128 } });

    const expectedHex = '#aa8077';

    const colorPreview = screen.getByRole('img', {
      name: /color_picker.current_color/i,
    });
    expect(colorPreview).toHaveStyle(`background-color: ${expectedHex}`);

    const hexInput = screen.getByLabelText(/color_picker.hex/i);
    expect(hexInput).toHaveValue(expectedHex);

    const greenSlider = screen.getByRole('slider', {
      name: /color_picker.green/i,
    });

    expect(greenSlider).toHaveValue(String(128));

    expect(mock_onColorChange).toHaveBeenCalledWith(
      OkColor.fromHex(expectedHex)
    );
  });
  it('updates hex input and calls onColorChange when blue input changes', () => {
    const initialColor = OkColor.fromHex('#aa2277');
    const mock_onColorChange = vi.fn();

    render(
      <RgbColorPicker
        initialColor={initialColor}
        onColorChange={mock_onColorChange}
      />
    );

    const blueInput = screen.getByRole('spinbutton', {
      name: /color_picker.blue/i,
    });

    fireEvent.change(blueInput, { target: { value: 128 } });

    const expectedHex = '#aa2280';

    const colorPreview = screen.getByRole('img', {
      name: /color_picker.current_color/i,
    });
    expect(colorPreview).toHaveStyle(`background-color: ${expectedHex}`);

    const hexInput = screen.getByLabelText(/color_picker.hex/i);
    expect(hexInput).toHaveValue(expectedHex);

    const blueSlider = screen.getByRole('slider', {
      name: /color_picker.blue/i,
    });

    expect(blueSlider).toHaveValue(String(128));

    expect(mock_onColorChange).toHaveBeenCalledWith(
      OkColor.fromHex(expectedHex)
    );
  });
  it('updates hex input and calls onColorChange when red slider changes', () => {
    const initialColor = OkColor.fromHex('#aa2277');
    const mock_onColorChange = vi.fn();

    render(
      <RgbColorPicker
        initialColor={initialColor}
        onColorChange={mock_onColorChange}
      />
    );

    const redSlider = screen.getByRole('slider', {
      name: /color_picker.red/i,
    });

    fireEvent.change(redSlider, { target: { value: 128 } });

    const expectedHex = '#802277';

    const colorPreview = screen.getByRole('img', {
      name: /color_picker.current_color/i,
    });
    expect(colorPreview).toHaveStyle(`background-color: ${expectedHex}`);

    const hexInput = screen.getByLabelText(/color_picker.hex/i);
    expect(hexInput).toHaveValue(expectedHex);

    const redInput = screen.getByRole('spinbutton', {
      name: /color_picker.red/i,
    });

    expect(redInput).toHaveValue(128);

    expect(mock_onColorChange).toHaveBeenCalledWith(
      OkColor.fromHex(expectedHex)
    );
  });
  it('updates hex input and calls onColorChange when green slider changes', () => {
    const initialColor = OkColor.fromHex('#aa2277');
    const mock_onColorChange = vi.fn();

    render(
      <RgbColorPicker
        initialColor={initialColor}
        onColorChange={mock_onColorChange}
      />
    );

    const greenSlider = screen.getByRole('slider', {
      name: /color_picker.green/i,
    });

    fireEvent.change(greenSlider, { target: { value: 128 } });

    const expectedHex = '#aa8077';

    const colorPreview = screen.getByRole('img', {
      name: /color_picker.current_color/i,
    });
    expect(colorPreview).toHaveStyle(`background-color: ${expectedHex}`);

    const hexInput = screen.getByLabelText(/color_picker.hex/i);
    expect(hexInput).toHaveValue(expectedHex);

    const greenInput = screen.getByRole('spinbutton', {
      name: /color_picker.green/i,
    });

    expect(greenInput).toHaveValue(128);

    expect(mock_onColorChange).toHaveBeenCalledWith(
      OkColor.fromHex(expectedHex)
    );
  });
  it('updates hex input and calls onColorChange when blue slider changes', () => {
    const initialColor = OkColor.fromHex('#aa2277');
    const mock_onColorChange = vi.fn();

    render(
      <RgbColorPicker
        initialColor={initialColor}
        onColorChange={mock_onColorChange}
      />
    );

    const blueSlider = screen.getByRole('slider', {
      name: /color_picker.blue/i,
    });

    fireEvent.change(blueSlider, { target: { value: 128 } });

    const expectedHex = '#aa2280';

    const colorPreview = screen.getByRole('img', {
      name: /color_picker.current_color/i,
    });
    expect(colorPreview).toHaveStyle(`background-color: ${expectedHex}`);

    const hexInput = screen.getByLabelText(/color_picker.hex/i);
    expect(hexInput).toHaveValue(expectedHex);

    const blueInput = screen.getByRole('spinbutton', {
      name: /color_picker.blue/i,
    });

    expect(blueInput).toHaveValue(128);

    expect(mock_onColorChange).toHaveBeenCalledWith(
      OkColor.fromHex(expectedHex)
    );
  });
});
