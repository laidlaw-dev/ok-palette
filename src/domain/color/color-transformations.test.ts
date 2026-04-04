import {
  generateAnalogousColors,
  generateComplementaryColors,
} from './color-transformations';
import { OkColor } from './ok-color';

describe('generateAnalogousColors', () => {
  it('generates analogous colors with default options', () => {
    const baseColor = new OkColor({
      lightness: 0.7,
      harmonizedChroma: 0.7,
      hue: 180,
    });
    const analogousColors = generateAnalogousColors(baseColor);

    expect(analogousColors).toHaveLength(2);
    expect(
      analogousColors[0].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 150, // 30 degrees counterclockwise
        })
      )
    ).toBe(true);
    expect(
      analogousColors[1].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 210, // 30 degrees clockwise
        })
      )
    ).toBe(true);
  });
  it('generates analogous colors with default options when original color is at boundary', () => {
    const baseColor = new OkColor({
      lightness: 0.7,
      harmonizedChroma: 0.7,
      hue: 10,
    });
    const analogousColors = generateAnalogousColors(baseColor);

    expect(analogousColors).toHaveLength(2);
    expect(
      analogousColors[0].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 340, // 30 degrees counterclockwise
        })
      )
    ).toBe(true);
    expect(
      analogousColors[1].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 40, // 30 degrees clockwise
        })
      )
    ).toBe(true);
  });
  it('generates analogous colors with angle option set', () => {
    const baseColor = new OkColor({
      lightness: 0.7,
      harmonizedChroma: 0.7,
      hue: 180,
    });
    const analogousColors = generateAnalogousColors(baseColor, { angle: 15 });

    expect(analogousColors).toHaveLength(2);
    expect(
      analogousColors[0].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 165, // 15 degrees counterclockwise
        })
      )
    ).toBe(true);
    expect(
      analogousColors[1].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 195, // 15 degrees clockwise
        })
      )
    ).toBe(true);
  });
  it('generates analogous colors with angle = 1 when option < 1', () => {
    const baseColor = new OkColor({
      lightness: 0.7,
      harmonizedChroma: 0.7,
      hue: 180,
    });
    const analogousColors = generateAnalogousColors(baseColor, { angle: -5 });

    expect(analogousColors).toHaveLength(2);
    expect(
      analogousColors[0].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 179, // 1 degree counterclockwise
        })
      )
    ).toBe(true);
    expect(
      analogousColors[1].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 181, // 1 degree clockwise
        })
      )
    ).toBe(true);
  });
  it('generates analogous colors with angle = 30 when option > 30', () => {
    const baseColor = new OkColor({
      lightness: 0.7,
      harmonizedChroma: 0.7,
      hue: 180,
    });
    const analogousColors = generateAnalogousColors(baseColor, { angle: 35 });

    expect(analogousColors).toHaveLength(2);
    expect(
      analogousColors[0].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 150, // 30 degrees counterclockwise
        })
      )
    ).toBe(true);
    expect(
      analogousColors[1].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 210, // 30 degrees clockwise
        })
      )
    ).toBe(true);
  });
  it('generates 4 analogous colors with count option = 2', () => {
    const baseColor = new OkColor({
      lightness: 0.7,
      harmonizedChroma: 0.7,
      hue: 180,
    });
    const analogousColors = generateAnalogousColors(baseColor, { count: 2 });

    expect(analogousColors).toHaveLength(4);
    expect(
      analogousColors[0].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 120, // 60 degrees counterclockwise
        })
      )
    ).toBe(true);
    expect(
      analogousColors[1].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 150, // 30 degrees counterclockwise
        })
      )
    ).toBe(true);
    expect(
      analogousColors[2].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 210, // 30 degrees clockwise
        })
      )
    ).toBe(true);
    expect(
      analogousColors[3].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 240, // 60 degrees clockwise
        })
      )
    ).toBe(true);
  });
  it('generates 6 analogous colors with count option = 3', () => {
    const baseColor = new OkColor({
      lightness: 0.7,
      harmonizedChroma: 0.7,
      hue: 180,
    });
    const analogousColors = generateAnalogousColors(baseColor, { count: 3 });

    expect(analogousColors).toHaveLength(6);
    expect(
      analogousColors[0].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 90, // 90 degrees counterclockwise
        })
      )
    ).toBe(true);
    expect(
      analogousColors[1].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 120, // 60 degrees counterclockwise
        })
      )
    ).toBe(true);
    expect(
      analogousColors[2].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 150, // 30 degrees counterclockwise
        })
      )
    ).toBe(true);
    expect(
      analogousColors[3].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 210, // 30 degrees clockwise
        })
      )
    ).toBe(true);
    expect(
      analogousColors[4].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 240, // 60 degrees clockwise
        })
      )
    ).toBe(true);
    expect(
      analogousColors[5].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 270, // 90 degrees clockwise
        })
      )
    ).toBe(true);
  });
  it('generates 2 analogous colors with count option < 1', () => {
    const baseColor = new OkColor({
      lightness: 0.7,
      harmonizedChroma: 0.7,
      hue: 180,
    });
    const analogousColors = generateAnalogousColors(baseColor, { count: 0 });

    expect(analogousColors).toHaveLength(2);
  });
  it('generates 6 analogous colors with count option > 3', () => {
    const baseColor = new OkColor({
      lightness: 0.7,
      harmonizedChroma: 0.7,
      hue: 180,
    });
    const analogousColors = generateAnalogousColors(baseColor, { count: 5 });

    expect(analogousColors).toHaveLength(6);
  });
});

describe('generateComplementaryColors', () => {
  it('generates complementary colors', () => {
    const baseColor = new OkColor({
      lightness: 0.7,
      harmonizedChroma: 0.7,
      hue: 180,
    });
    const complementaryColors = generateComplementaryColors(baseColor);

    expect(complementaryColors.complementary).toHaveLength(1);
    expect(
      complementaryColors.complementary[0].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 0, // 180 degrees opposite
        })
      )
    ).toBe(true);
    expect(complementaryColors.split).toHaveLength(2);
    expect(
      complementaryColors.split[0].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 30, // 150 degrees counterclockwise from base
        })
      )
    ).toBe(true);
    expect(
      complementaryColors.split[1].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 330, // 150 degrees clockwise from base
        })
      )
    ).toBe(true);
    expect(complementaryColors.triadic).toHaveLength(2);
    expect(
      complementaryColors.triadic[0].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 60, // 120 degrees counterclockwise from base
        })
      )
    ).toBe(true);
    expect(
      complementaryColors.triadic[1].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 300, // 120 degrees clockwise from base
        })
      )
    ).toBe(true);
    expect(complementaryColors.analogous).toHaveLength(4);
    expect(
      complementaryColors.analogous[0].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 150, // 30 degrees counterclockwise from base
        })
      )
    ).toBe(true);
    expect(
      complementaryColors.analogous[1].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 165, // 15 degrees counterclockwise from base
        })
      )
    ).toBe(true);
    expect(
      complementaryColors.analogous[2].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 195, // 15 degrees clockwise from base
        })
      )
    ).toBe(true);
    expect(
      complementaryColors.analogous[3].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 210, // 30 degrees clockwise from base
        })
      )
    ).toBe(true);
  });
  it('generates complementary colors when color hue is at boundary', () => {
    const baseColor = new OkColor({
      lightness: 0.7,
      harmonizedChroma: 0.7,
      hue: 15,
    });
    const complementaryColors = generateComplementaryColors(baseColor);

    expect(complementaryColors.complementary).toHaveLength(1);
    expect(
      complementaryColors.complementary[0].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 195, // 180 degrees opposite
        })
      )
    ).toBe(true);
    expect(complementaryColors.split).toHaveLength(2);
    expect(
      complementaryColors.split[0].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 225, // 150 degrees counterclockwise from base
        })
      )
    ).toBe(true);
    expect(
      complementaryColors.split[1].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 165, // 150 degrees clockwise from base
        })
      )
    ).toBe(true);
    expect(complementaryColors.triadic).toHaveLength(2);
    expect(
      complementaryColors.triadic[0].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 255, // 120 degrees counterclockwise from base
        })
      )
    ).toBe(true);
    expect(
      complementaryColors.triadic[1].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 135, // 120 degrees clockwise from base
        })
      )
    ).toBe(true);
    expect(complementaryColors.analogous).toHaveLength(4);
    expect(
      complementaryColors.analogous[0].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 345, // 30 degrees counterclockwise from base
        })
      )
    ).toBe(true);
    expect(
      complementaryColors.analogous[1].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 0, // 15 degrees counterclockwise from base
        })
      )
    ).toBe(true);
    expect(
      complementaryColors.analogous[2].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 30, // 15 degrees counterclockwise from base
        })
      )
    ).toBe(true);
    expect(
      complementaryColors.analogous[3].equals(
        new OkColor({
          lightness: 0.7,
          harmonizedChroma: 0.7,
          hue: 45, // 15 degrees clockwise from base
        })
      )
    ).toBe(true);
  });
});
