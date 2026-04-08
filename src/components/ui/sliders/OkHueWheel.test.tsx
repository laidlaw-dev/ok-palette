import { OkColor } from '@/domain/color';
import { render, screen, fireEvent } from '@testing-library/react';

import { OkHueWheel } from './OkHueWheel';

describe('OkHueWheel', () => {
  it('renders the OkHueWheel component', () => {
    const initialColor = new OkColor({
      lightness: 0.8,
      harmonizedChroma: 0.8,
      hue: 180,
    });
    const mock_onChange = vi.fn();
    render(<OkHueWheel value={initialColor} onChange={mock_onChange} />);
    const hueWheelElement = screen.getByRole('slider');
    expect(hueWheelElement).toBeInTheDocument();
  });
  it('calls onChange when the hue wheel is interacted with', () => {
    const initialColor = new OkColor({
      lightness: 0.7,
      harmonizedChroma: 0.8,
      hue: 180,
    });
    const mock_onChange = vi.fn();
    render(
      <OkHueWheel value={initialColor} onChange={mock_onChange} size={100} />
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
    // Simulate user interaction with the hue wheel (e.g., clicking or dragging)
    // This is a placeholder for the actual interaction simulation
    // You would need to use fireEvent or userEvent from @testing-library/react to simulate the interaction
    // For example:
    // fireEvent.mouseDown(hueWheelElement, { clientX: 100, clientY: 100 });
    // fireEvent.mouseMove(hueWheelElement, { clientX: 150, clientY: 150 });
    // fireEvent.mouseUp(hueWheelElement);

    // After simulating the interaction, check if onChange was called
    fireEvent.mouseDown(hueWheelElement, { clientX: 95, clientY: 50 }); // Simulate a click for testing purposes

    expect(mock_onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        hue: 90,
        harmonizedChroma: 0.8,
        lightness: 0.7,
      } as OkColor)
    );
  });

  it('updates input display when circle is dragged', () => {
    const initialColor = new OkColor({
      lightness: 0.7,
      harmonizedChroma: 0.8,
      hue: 180,
    });
    const mock_onChange = vi.fn();
    render(
      <OkHueWheel value={initialColor} onChange={mock_onChange} size={100} />
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

    expect(mock_onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        hue: 90,
        harmonizedChroma: 0.8,
        lightness: 0.7,
      } as OkColor)
    );

    fireEvent.mouseMove(hueWheelElement, { clientX: 5, clientY: 50 });

    expect(mock_onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        hue: 270,
        harmonizedChroma: 0.8,
        lightness: 0.7,
      } as OkColor)
    );
  });

  it('does not update color when mouse moved without dragging', () => {
    const initialColor = new OkColor({
      lightness: 0.7,
      harmonizedChroma: 0.8,
      hue: 180,
    });
    const mock_onChange = vi.fn();
    render(
      <OkHueWheel
        value={initialColor}
        onChange={mock_onChange}
        size={100}
        disabled={true}
      />
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

    fireEvent.mouseMove(hueWheelElement, { clientX: 5, clientY: 50 });

    expect(mock_onChange).not.toHaveBeenCalled();
  });

  it('does not update color when disabled', () => {
    const initialColor = new OkColor({
      lightness: 0.7,
      harmonizedChroma: 0.8,
      hue: 180,
    });
    const mock_onChange = vi.fn();
    render(
      <OkHueWheel
        value={initialColor}
        onChange={mock_onChange}
        size={100}
        disabled={true}
      />
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
    fireEvent.mouseMove(hueWheelElement, { clientX: 5, clientY: 50 });
    fireEvent.mouseUp(hueWheelElement);

    expect(mock_onChange).not.toHaveBeenCalled();
  });
});
