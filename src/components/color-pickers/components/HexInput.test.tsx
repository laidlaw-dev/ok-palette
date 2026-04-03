import { render, screen, fireEvent } from '@testing-library/react';

import { HexInput } from './HexInput';

describe('HexInput', () => {
  it('renders with initial value', () => {
    const initialColor = '#ff2277';

    render(<HexInput value={initialColor} onChange={() => {}} />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue(initialColor);
  });
  it('calls onChange with new color and removes invalid state when input changes to valid hex', () => {
    const initialColor = '#ff2277';
    const mock_onChange = vi.fn();

    render(<HexInput value={initialColor} onChange={mock_onChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '#00ff00' } });

    expect(mock_onChange).toHaveBeenCalledWith('#00ff00');
    expect(input).not.toHaveAttribute('data-invalid');
  });
  it('calls onChange with new color and removes invalid state when input changes to valid 3 char hex', () => {
    const initialColor = '#f27';
    const mock_onChange = vi.fn();

    render(<HexInput value={initialColor} onChange={mock_onChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '#0f0' } });

    expect(mock_onChange).toHaveBeenCalledWith('#0f0');
    expect(input).not.toHaveAttribute('data-invalid');
  });
  it('does not call onChange and sets state to invalid when input changes to invalid hex', () => {
    const initialColor = '#ff2277';
    const mock_onChange = vi.fn();

    render(<HexInput value={initialColor} onChange={mock_onChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'invalid' } });

    expect(mock_onChange).not.toHaveBeenCalled();
    expect(input).toHaveAttribute('data-invalid');
  });
  it('does not call onChange and sets state to invalid when input changes to 8 char hex', () => {
    const initialColor = '#ff2277';
    const mock_onChange = vi.fn();

    render(<HexInput value={initialColor} onChange={mock_onChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '#ff227700' } });

    expect(mock_onChange).not.toHaveBeenCalled();
    expect(input).toHaveAttribute('data-invalid');
  });
  it('does not call onChange and sets state to invalid when input changes to 4 char hex', () => {
    const initialColor = '#ff2277';
    const mock_onChange = vi.fn();

    render(<HexInput value={initialColor} onChange={mock_onChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '#0f0f' } });

    expect(mock_onChange).not.toHaveBeenCalled();
    expect(input).toHaveAttribute('data-invalid');
  });
});
