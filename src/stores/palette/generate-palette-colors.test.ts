import { asChroma, asHue, asLightness, OkColor } from '../../domain/color';
import { generatePaletteColors } from './generate-palette-colors';

describe('generatePaletteColors', () => {
  const redHue = 15;
  const blueHue = 240;
  const greenHue = 120;
  const allColors = [
    { id: '1', name: 'Red', hue: asHue(redHue) },
    { id: '2', name: 'Green', hue: asHue(greenHue) },
    { id: '3', name: 'Blue', hue: asHue(blueHue) },
  ];

  it('generates empty arrays when palette is undefined', () => {
    const result = generatePaletteColors({
      palette: undefined,
      colorSets: [],
      allColors: [],
    });
    expect(result.allColors).toEqual([]);
    expect(result.colorSets).toEqual([]);
  });
  it('generates empty array when palette colors or collections are empty', () => {
    const result = generatePaletteColors({
      palette: {
        id: '1',
        name: 'Palette_1',
        baseLightness: asLightness(0),
        baseChroma: asChroma(0),
        colorSetValues: [],
      },
      colorSets: [],
      allColors: [],
    });
    expect(result.allColors).toEqual([]);
    expect(result.colorSets).toEqual([]);
  });
  it('generates allColors', () => {
    const defaultLightness = asLightness(0.7);
    const defaultChroma = asChroma(0.8);

    const result = generatePaletteColors({
      palette: {
        id: '1',
        name: 'Palette_1',
        baseLightness: asLightness(defaultLightness),
        baseChroma: asChroma(defaultChroma),
        colorSetValues: [],
      },
      colorSets: [],
      allColors: [...allColors],
    });

    expect(result.allColors.length).toBe(3);

    const red = result.allColors[0];
    expect(red.name).toBe('Red');
    expect(red.id).toBe('1');
    expect(
      new OkColor({
        lightness: defaultLightness,
        harmonizedChroma: defaultChroma,
        hue: redHue,
      }).equals(red.color)
    ).toBe(true);

    const green = result.allColors[1];
    expect(green.name).toBe('Green');
    expect(green.id).toBe('2');
    expect(
      new OkColor({
        lightness: defaultLightness,
        harmonizedChroma: defaultChroma,
        hue: greenHue,
      }).equals(green.color)
    ).toBe(true);

    const blue = result.allColors[2];
    expect(blue.name).toBe('Blue');
    expect(blue.id).toBe('3');
    expect(
      new OkColor({
        lightness: defaultLightness,
        harmonizedChroma: defaultChroma,
        hue: blueHue,
      }).equals(blue.color)
    ).toBe(true);

    expect(result.colorSets).toEqual([]);
  });
  it('generates multiple color sets', () => {
    const defaultLightness = asLightness(0.7);
    const defaultChroma = asChroma(0.8);
    const colorSetLightness = [
      asLightness(0.5),
      asLightness(0.6),
      asLightness(0.9),
    ];
    const colorSetChroma = [asChroma(0.5), asChroma(0.6), asChroma(0.9)];

    const result = generatePaletteColors({
      palette: {
        id: '1',
        name: 'Palette_1',
        baseLightness: asLightness(defaultLightness),
        baseChroma: asChroma(defaultChroma),
        colorSetValues: [
          {
            colorSetId: '1',
            lightness: colorSetLightness[0],
            chroma: colorSetChroma[0],
          },
          {
            colorSetId: '2',
            lightness: colorSetLightness[1],
            chroma: colorSetChroma[1],
          },
          {
            colorSetId: '3',
            lightness: colorSetLightness[2],
            chroma: colorSetChroma[2],
          },
        ],
      },
      colorSets: [
        {
          id: '1',
          name: 'color_set_1',
          colorIds: ['1', '3'],
        },
        {
          id: '2',
          name: 'color_set_2',
          colorIds: ['1', '2', '3'],
        },
        {
          id: '3',
          name: 'color_set_3',
          colorIds: [],
        },
      ],
      allColors: [...allColors],
    });

    expect(result.colorSets.length).toBe(3);

    const colorSet1 = result.colorSets[0];
    expect(colorSet1.lightness).toBe(colorSetLightness[0]);
    expect(colorSet1.chroma).toBe(colorSetChroma[0]);

    const colorSet2 = result.colorSets[1];
    expect(colorSet2.lightness).toBe(colorSetLightness[1]);
    expect(colorSet2.chroma).toBe(colorSetChroma[1]);

    const colorSet3 = result.colorSets[2];
    expect(colorSet3.lightness).toBe(colorSetLightness[2]);
    expect(colorSet3.chroma).toBe(colorSetChroma[2]);
  });
  it('generates collections with all colors', () => {
    const defaultLightness = asLightness(0.7);
    const defaultChroma = asChroma(0.8);
    const collectionLightness = asLightness(0.5);
    const collectionChroma = asChroma(0.5);

    const result = generatePaletteColors({
      palette: {
        id: '1',
        name: 'Palette_1',
        baseLightness: asLightness(defaultLightness),
        baseChroma: asChroma(defaultChroma),
        colorSetValues: [
          {
            colorSetId: '1',
            lightness: collectionLightness,
            chroma: collectionChroma,
          },
        ],
      },
      colorSets: [
        {
          id: '1',
          name: 'color_set_1',
          colorIds: ['1', '2', '3'],
        },
      ],
      allColors: [...allColors],
    });

    expect(result.colorSets.length).toBe(1);

    const colorSet1 = result.colorSets[0];
    expect(colorSet1.lightness).toBe(collectionLightness);
    expect(colorSet1.chroma).toBe(collectionChroma);
    expect(colorSet1.colors.length).toBe(3);

    const red = colorSet1.colors[0];
    expect(red.id).toBe('1');
    expect(red.name).toBe('Red');
    expect(
      new OkColor({
        lightness: collectionLightness,
        harmonizedChroma: collectionChroma,
        hue: redHue,
      }).equals(red.color!)
    ).toBe(true);

    const green = colorSet1.colors[1];
    expect(green.id).toBe('2');
    expect(green.name).toBe('Green');
    expect(
      new OkColor({
        lightness: collectionLightness,
        harmonizedChroma: collectionChroma,
        hue: greenHue,
      }).equals(green.color!)
    ).toBe(true);

    const blue = colorSet1.colors[2];
    expect(blue.id).toBe('3');
    expect(blue.name).toBe('Blue');
    expect(
      new OkColor({
        lightness: collectionLightness,
        harmonizedChroma: collectionChroma,
        hue: blueHue,
      }).equals(blue.color!)
    ).toBe(true);
  });
  it('does not generate collection when palette has no colorSetValues', () => {
    const defaultLightness = asLightness(0.7);
    const defaultChroma = asChroma(0.8);

    const result = generatePaletteColors({
      palette: {
        id: '1',
        name: 'Palette_1',
        baseLightness: asLightness(defaultLightness),
        baseChroma: asChroma(defaultChroma),
        colorSetValues: [],
      },
      colorSets: [
        {
          id: '1',
          name: 'color_set_1',
          colorIds: ['1', '2', '3'],
        },
      ],
      allColors: [...allColors],
    });

    expect(result.colorSets.length).toBe(0);
  });
  it('generates collections with colors and undefined for missing colors', () => {
    const defaultLightness = asLightness(0.7);
    const defaultChroma = asChroma(0.8);
    const collectionLightness = asLightness(0.5);
    const collectionChroma = asChroma(0.5);

    const result = generatePaletteColors({
      palette: {
        id: '1',
        name: 'Palette_1',
        baseLightness: asLightness(defaultLightness),
        baseChroma: asChroma(defaultChroma),
        colorSetValues: [
          {
            colorSetId: '1',
            lightness: collectionLightness,
            chroma: collectionChroma,
          },
        ],
      },
      colorSets: [
        {
          id: '1',
          name: 'collection_1',
          colorIds: ['1', '3'],
        },
      ],
      allColors: [...allColors],
    });

    expect(result.colorSets.length).toBe(1);

    const colorSet1 = result.colorSets[0];
    expect(colorSet1.id).toBe('1');
    expect(colorSet1.name).toBe('collection_1');
    expect(colorSet1.lightness).toBe(collectionLightness);
    expect(colorSet1.chroma).toBe(collectionChroma);
    expect(colorSet1.colors.length).toBe(3);

    const red = colorSet1.colors[0];
    expect(red.id).toBe('1');
    expect(red.name).toBe('Red');
    expect(
      new OkColor({
        lightness: collectionLightness,
        harmonizedChroma: collectionChroma,
        hue: redHue,
      }).equals(red.color!)
    ).toBe(true);

    const green = colorSet1.colors[1];
    expect(green.id).toBe('2');
    expect(green.name).toBe('Green');
    expect(green.color).toBeUndefined();

    const blue = colorSet1.colors[2];
    expect(blue.id).toBe('3');
    expect(blue.name).toBe('Blue');
    expect(
      new OkColor({
        lightness: collectionLightness,
        harmonizedChroma: collectionChroma,
        hue: blueHue,
      }).equals(blue.color!)
    ).toBe(true);
  });
  it('generates collections with colors undefined when all colors are missing', () => {
    const defaultLightness = asLightness(0.7);
    const defaultChroma = asChroma(0.8);
    const collectionLightness = asLightness(0.5);
    const collectionChroma = asChroma(0.5);

    const result = generatePaletteColors({
      palette: {
        id: '1',
        name: 'Palette_1',
        baseLightness: asLightness(defaultLightness),
        baseChroma: asChroma(defaultChroma),
        colorSetValues: [
          {
            colorSetId: '1',
            lightness: collectionLightness,
            chroma: collectionChroma,
          },
        ],
      },
      colorSets: [
        {
          id: '1',
          name: 'collection_1',
          colorIds: [],
        },
      ],
      allColors: [...allColors],
    });

    expect(result.colorSets.length).toBe(1);

    const colorSet1 = result.colorSets[0];
    expect(colorSet1.id).toBe('1');
    expect(colorSet1.name).toBe('collection_1');
    expect(colorSet1.lightness).toBe(collectionLightness);
    expect(colorSet1.chroma).toBe(collectionChroma);
    expect(colorSet1.colors.length).toBe(3);

    const red = colorSet1.colors[0];
    expect(red.id).toBe('1');
    expect(red.name).toBe('Red');
    expect(red.color).toBeUndefined();

    const green = colorSet1.colors[1];
    expect(green.id).toBe('2');
    expect(green.name).toBe('Green');
    expect(green.color).toBeUndefined();

    const blue = colorSet1.colors[2];
    expect(blue.id).toBe('3');
    expect(blue.name).toBe('Blue');
    expect(blue.color).toBeUndefined();
  });
});
