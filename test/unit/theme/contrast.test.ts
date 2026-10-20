import { colors, type ColorName } from '../../../src/theme/colors';

// WCAG 2.x contrast ratio between two #RRGGBB colours.
function luminance(hex: string): number {
  const channels: number[] = [1, 3, 5].map(start => {
    const value: number = parseInt(hex.slice(start, start + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  const [r = 0, g = 0, b = 0] = channels;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground: string, background: string): number {
  const [light, dark] = [luminance(foreground), luminance(background)].sort(
    (a, b) => b - a,
  );
  return ((light ?? 0) + 0.05) / ((dark ?? 0) + 0.05);
}

const backgrounds: readonly ColorName[] = [
  'background',
  'surface',
  'surfaceRaised',
];

// Body text needs 4.5:1 (WCAG AA) on every background it appears on.
const textColors: readonly ColorName[] = [
  'text',
  'textSecondary',
  'textMuted',
  'textSubtle',
  'accent',
  'danger',
  'fasting',
  'protein',
  'carbs',
  'fat',
  'water',
  'steps',
];

describe('colour contrast', () => {
  test.each(textColors)('%s is readable on every background', name => {
    for (const background of backgrounds) {
      expect(contrast(colors[name], colors[background])).toBeGreaterThanOrEqual(
        4.5,
      );
    }
  });

  test('text on the accent colour is readable', () => {
    expect(contrast(colors.onAccent, colors.accent)).toBeGreaterThanOrEqual(
      4.5,
    );
  });

  test('text on the water surface is readable', () => {
    expect(
      contrast(colors.onWaterSurface, colors.waterSurface),
    ).toBeGreaterThanOrEqual(4.5);
  });
});
