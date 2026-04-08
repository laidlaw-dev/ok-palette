import { render, screen, fireEvent } from '@testing-library/react';

import { SuggestedColors } from './SuggestedColors';
import type { AvailableColorGroup } from '../utils/filter-available-colors';
import { OkColor } from '@/domain/color';

const complementary = OkColor.fromHex('#770077');
const grey = OkColor.fromHex('#808080');
const red = OkColor.fromHex('#aa0000');
const green = OkColor.fromHex('#00aa00');
const blue = OkColor.fromHex('#0000aa');

describe('SuggestedColors', () => {
  it('renders color groups with correct labels', () => {
    const colorGroups: AvailableColorGroup[] = [
      { key: 'complementary', colors: [complementary] },
      { key: 'achromatic', colors: [grey] },
      { key: 'red', colors: [red] },
      { key: 'green', colors: [green] },
      { key: 'blue', colors: [blue] },
    ];

    render(<SuggestedColors colorGroups={colorGroups} onAddColor={() => {}} />);
    expect(screen.getByText('hue_names.complements')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: complementary.hex })
    ).toBeInTheDocument();
    expect(screen.getByText('hue_names.achromatic')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: grey.hex })).toBeInTheDocument();
    expect(screen.getByText('hue_names.hues')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: red.hex })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: green.hex })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: blue.hex })).toBeInTheDocument();
  });
  it('does not render color groups that have no colors', () => {
    const colorGroups: AvailableColorGroup[] = [
      { key: 'complementary', colors: [] },
      { key: 'achromatic', colors: [] },
      { key: 'red', colors: [] },
    ];

    render(<SuggestedColors colorGroups={colorGroups} onAddColor={() => {}} />);
    expect(screen.queryByText('hue_names.complements')).not.toBeInTheDocument();
    expect(screen.queryByText('hue_names.achromatic')).not.toBeInTheDocument();
    expect(screen.queryByText('hue_names.hues')).not.toBeInTheDocument();
  });
  it('renders complements group and button when complementary colors are available', () => {
    const mock_onAddColor = vi.fn();
    const colorGroups: AvailableColorGroup[] = [
      { key: 'complementary', colors: [complementary] },
    ];

    render(
      <SuggestedColors colorGroups={colorGroups} onAddColor={mock_onAddColor} />
    );
    expect(screen.getByText('hue_names.complements')).toBeInTheDocument();
    expect(screen.queryByText('hue_names.achromatic')).not.toBeInTheDocument();
    expect(screen.queryByText('hue_names.hues')).not.toBeInTheDocument();

    const complementaryButton = screen.getByRole('button', {
      name: complementary.hex,
    });
    fireEvent.click(complementaryButton);
    expect(mock_onAddColor).toHaveBeenCalledWith(
      'complementary',
      complementary
    );
  });
  it('renders complements group and buttonwhen split complementary colors are available', () => {
    const mock_onAddColor = vi.fn();
    const colorGroups: AvailableColorGroup[] = [
      { key: 'split', colors: [complementary] },
    ];

    render(
      <SuggestedColors colorGroups={colorGroups} onAddColor={mock_onAddColor} />
    );
    expect(screen.getByText('hue_names.complements')).toBeInTheDocument();
    expect(screen.queryByText('hue_names.achromatic')).not.toBeInTheDocument();
    expect(screen.queryByText('hue_names.hues')).not.toBeInTheDocument();

    const complementaryButton = screen.getByRole('button', {
      name: complementary.hex,
    });
    fireEvent.click(complementaryButton);
    expect(mock_onAddColor).toHaveBeenCalledWith('split', complementary);
  });
  it('renders complements group when triadic complementary colors are available', () => {
    const mock_onAddColor = vi.fn();
    const colorGroups: AvailableColorGroup[] = [
      { key: 'triadic', colors: [complementary] },
    ];

    render(
      <SuggestedColors colorGroups={colorGroups} onAddColor={mock_onAddColor} />
    );
    expect(screen.getByText('hue_names.complements')).toBeInTheDocument();
    expect(screen.queryByText('hue_names.achromatic')).not.toBeInTheDocument();
    expect(screen.queryByText('hue_names.hues')).not.toBeInTheDocument();

    const complementaryButton = screen.getByRole('button', {
      name: complementary.hex,
    });
    fireEvent.click(complementaryButton);
    expect(mock_onAddColor).toHaveBeenCalledWith('triadic', complementary);
  });
  it('renders complements group when analogous complementary colors are available', () => {
    const mock_onAddColor = vi.fn();
    const colorGroups: AvailableColorGroup[] = [
      { key: 'analogous', colors: [complementary] },
    ];

    render(
      <SuggestedColors colorGroups={colorGroups} onAddColor={mock_onAddColor} />
    );
    expect(screen.getByText('hue_names.complements')).toBeInTheDocument();
    expect(screen.queryByText('hue_names.achromatic')).not.toBeInTheDocument();
    expect(screen.queryByText('hue_names.hues')).not.toBeInTheDocument();

    const complementaryButton = screen.getByRole('button', {
      name: complementary.hex,
    });
    fireEvent.click(complementaryButton);
    expect(mock_onAddColor).toHaveBeenCalledWith('analogous', complementary);
  });
  it('renders achromatic group when achromatic colors are available', () => {
    const mock_onAddColor = vi.fn();
    const colorGroups: AvailableColorGroup[] = [
      { key: 'achromatic', colors: [grey] },
    ];

    render(
      <SuggestedColors colorGroups={colorGroups} onAddColor={mock_onAddColor} />
    );
    expect(screen.queryByText('hue_names.complements')).not.toBeInTheDocument();
    expect(screen.getByText('hue_names.achromatic')).toBeInTheDocument();
    expect(screen.queryByText('hue_names.hues')).not.toBeInTheDocument();

    const achromaticButton = screen.getByRole('button', {
      name: grey.hex,
    });
    fireEvent.click(achromaticButton);
    expect(mock_onAddColor).toHaveBeenCalledWith('achromatic', grey);
  });
  it('renders hues group when hue colors are available', () => {
    const mock_onAddColor = vi.fn();
    const colorGroups: AvailableColorGroup[] = [
      { key: 'red', colors: [red] },
      { key: 'green', colors: [green] },
      { key: 'blue', colors: [blue] },
    ];

    render(
      <SuggestedColors colorGroups={colorGroups} onAddColor={mock_onAddColor} />
    );
    expect(screen.queryByText('hue_names.complements')).not.toBeInTheDocument();
    expect(screen.queryByText('hue_names.achromatic')).not.toBeInTheDocument();
    expect(screen.getByText('hue_names.hues')).toBeInTheDocument();

    const redButton = screen.getByRole('button', {
      name: red.hex,
    });
    fireEvent.click(redButton);
    expect(mock_onAddColor).toHaveBeenCalledWith('red', red);

    const greenButton = screen.getByRole('button', {
      name: green.hex,
    });
    fireEvent.click(greenButton);
    expect(mock_onAddColor).toHaveBeenCalledWith('green', green);

    const blueButton = screen.getByRole('button', { name: blue.hex });
    fireEvent.click(blueButton);
    expect(mock_onAddColor).toHaveBeenCalledWith('blue', blue);
  });
});
