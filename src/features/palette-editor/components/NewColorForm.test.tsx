import { render, screen, fireEvent } from '@testing-library/react';
import { NewColorForm } from './NewColorForm';

describe('NewColorForm', () => {
  const baseName = 'color';
  const usedNames = ['color', 'color-1', 'color-3'];
  const onSubmit = vi.fn();
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form with suggested name', () => {
    render(
      <NewColorForm
        baseName={baseName}
        usedNames={usedNames}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );

    const input = screen.getByLabelText('palette.color_name');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('color-2');
  });

  it('shows validation error for empty name', () => {
    render(
      <NewColorForm
        baseName={baseName}
        usedNames={usedNames}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );

    const input = screen.getByLabelText('palette.color_name');
    fireEvent.change(input, { target: { value: '' } });

    const addButton = screen.getByRole('button', { name: 'palette.add_color' });
    fireEvent.click(addButton);

    expect(
      screen.getByText('validation.required_color_name')
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows validation error for non-unique name', () => {
    render(
      <NewColorForm
        baseName={baseName}
        usedNames={usedNames}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );

    const input = screen.getByLabelText('palette.color_name');
    fireEvent.change(input, { target: { value: 'color-3' } });

    const addButton = screen.getByRole('button', { name: 'palette.add_color' });
    fireEvent.click(addButton);

    expect(
      screen.getByText('validation.unique_color_name')
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits valid color name', () => {
    render(
      <NewColorForm
        baseName={baseName}
        usedNames={usedNames}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );

    const input = screen.getByLabelText('palette.color_name');
    fireEvent.change(input, { target: { value: 'color-4' } });

    const addButton = screen.getByRole('button', { name: 'palette.add_color' });
    fireEvent.click(addButton);

    expect(onSubmit).toHaveBeenCalledWith('color-4');
  });

  it('clears error when user corrects the name', () => {
    render(
      <NewColorForm
        baseName={baseName}
        usedNames={usedNames}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );

    const input = screen.getByLabelText('palette.color_name');
    fireEvent.change(input, { target: { value: 'color' } });

    const addButton = screen.getByRole('button', { name: 'palette.add_color' });
    fireEvent.click(addButton);

    expect(
      screen.getByText('validation.unique_color_name')
    ).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'color-2' } });

    expect(
      screen.queryByText('validation.unique_color_name')
    ).not.toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(
      <NewColorForm
        baseName={baseName}
        usedNames={usedNames}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );

    const cancelButton = screen.getByRole('button', { name: 'common.cancel' });
    fireEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalled();
  });
});
