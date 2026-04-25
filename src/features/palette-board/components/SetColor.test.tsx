import { render, screen, fireEvent } from '@testing-library/react';
import { SetColor } from './SetColor';
import { OkColor } from '@/domain/color';

describe('SetColor', () => {
  const onAddClick = vi.fn();
  const onDeleteClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with correct background color when in use', () => {
    const color = new OkColor({
      hue: 120,
      lightness: 0.5,
      harmonizedChroma: 0.5,
    });
    render(
      <SetColor
        name="test-color"
        color={color}
        isInUse={true}
        onAddClick={onAddClick}
        onDeleteClick={onDeleteClick}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveStyle(`background-color: ${color.css}`);
  });

  it('renders with transparent background when not in use', () => {
    const color = new OkColor({
      hue: 120,
      lightness: 0.5,
      harmonizedChroma: 0.5,
    });
    render(
      <SetColor
        name="test-color"
        color={color}
        isInUse={false}
        onAddClick={onAddClick}
        onDeleteClick={onDeleteClick}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveStyle(`background-color: rgba(0, 0, 0, 0)`);
  });

  it('calls onAddClick when clicked and not in use', () => {
    const color = new OkColor({
      hue: 120,
      lightness: 0.5,
      harmonizedChroma: 0.5,
    });
    render(
      <SetColor
        name="test-color"
        color={color}
        isInUse={false}
        onAddClick={onAddClick}
        onDeleteClick={onDeleteClick}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onAddClick).toHaveBeenCalled();
    expect(onDeleteClick).not.toHaveBeenCalled();
  });

  it('calls onDeleteClick when clicked and in use', () => {
    const color = new OkColor({
      hue: 120,
      lightness: 0.5,
      harmonizedChroma: 0.5,
    });
    render(
      <SetColor
        name="test-color"
        color={color}
        isInUse={true}
        onAddClick={onAddClick}
        onDeleteClick={onDeleteClick}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onDeleteClick).toHaveBeenCalled();
    expect(onAddClick).not.toHaveBeenCalled();
  });
});
