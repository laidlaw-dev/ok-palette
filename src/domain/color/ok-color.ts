import { formatCss, formatHex, parse } from 'culori/fn';
import { rgb } from 'culori';

export interface OkRGB {
  r: number;
  g: number;
  b: number;
}

export class OkColor {
  rgbStore: OkRGB;

  constructor(rgb: OkRGB) {
    this.rgbStore = rgb;
  }

  get css() {
    return formatCss({
      mode: 'rgb',
      r: this.rgb.r,
      g: this.rgb.g,
      b: this.rgb.b,
    });
  }

  get hex() {
    return formatHex(
      rgb({
        mode: 'rgb',
        r: this.rgb.r,
        g: this.rgb.g,
        b: this.rgb.b,
      })
    ).toLowerCase();
  }

  get rgb() {
    return this.rgbStore;
  }

  static fromHex(hex: string): OkColor {
    // Placeholder implementation, replace with actual color parsing logic
    const rgb = parse(hex);
    if (!rgb || rgb.mode !== 'rgb') {
      throw new Error(`Invalid hex color: ${hex}`);
    }
    return new OkColor({ r: rgb.r, g: rgb.g, b: rgb.b });
  }

  static fromRgb(rgb: OkRGB): OkColor {
    // Placeholder implementation, replace with actual color parsing logic
    return new OkColor({ r: rgb.r, g: rgb.g, b: rgb.b });
  }
}
