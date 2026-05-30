import { render, screen, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { NewColorSetForm } from './NewColorSetForm';

describe('NewColorSetForm', () => {
  const usedNames = ['color_set_types.default', 'color_set_types.text'];
  const onSubmit = vi.fn();
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    //  Needed for select component
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      }
    );
  });

  it('renders the form with suggested name', () => {
    render(
      <NewColorSetForm
        usedNames={usedNames}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );

    const input = screen.getByLabelText('color_set.name');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('color_set_types.default-1');
  });

  it('changes suggested name when type changed', async () => {
    render(
      <NewColorSetForm
        usedNames={usedNames}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );

    const typeSelect = screen.getByLabelText('color_set.type');
    fireEvent.click(typeSelect);

    const listbox = screen.getByRole('listbox');
    const option = screen.getByRole('option', {
      name: 'color_set_types.text',
    });

    await userEvent.selectOptions(listbox, option);

    const input = screen.getByLabelText('color_set.name');
    expect(input).toHaveValue('color_set_types.text-1');
  });

  it('does not change suggested name when user changed name and type changed', async () => {
    render(
      <NewColorSetForm
        usedNames={usedNames}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );

    const input = screen.getByLabelText('color_set.name');
    fireEvent.change(input, { target: { value: 'custom' } });

    const typeSelect = screen.getByLabelText('color_set.type');
    fireEvent.click(typeSelect);

    const listbox = screen.getByRole('listbox');
    const option = screen.getByRole('option', {
      name: 'color_set_types.text',
    });

    await userEvent.selectOptions(listbox, option);

    expect(input).toHaveValue('custom');
  });

  it('shows validation error for empty name', () => {
    render(
      <NewColorSetForm
        usedNames={usedNames}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );

    const input = screen.getByLabelText('color_set.name');
    fireEvent.change(input, { target: { value: '' } });

    const addButton = screen.getByRole('button', {
      name: 'color_set.add_color_set',
    });
    fireEvent.click(addButton);

    expect(screen.getByText('validation.required_name')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows validation error for non-unique name', () => {
    render(
      <NewColorSetForm
        usedNames={usedNames}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );

    const input = screen.getByLabelText('color_set.name');
    fireEvent.change(input, { target: { value: 'color_set_types.default' } });

    const addButton = screen.getByRole('button', {
      name: 'color_set.add_color_set',
    });
    fireEvent.click(addButton);

    expect(screen.getByText('validation.unique_name')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits with valid name and type', async () => {
    render(
      <NewColorSetForm
        usedNames={usedNames}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );

    const input = screen.getByLabelText('color_set.name');
    fireEvent.change(input, { target: { value: 'custom' } });

    const typeSelect = screen.getByLabelText('color_set.type');
    fireEvent.click(typeSelect);

    const listbox = screen.getByRole('listbox');
    const option = screen.getByRole('option', {
      name: 'color_set_types.text',
    });

    await userEvent.selectOptions(listbox, option);

    const addButton = screen.getByRole('button', {
      name: 'color_set.add_color_set',
    });
    fireEvent.click(addButton);

    expect(onSubmit).toHaveBeenCalledWith('custom', 'text');
  });
});
