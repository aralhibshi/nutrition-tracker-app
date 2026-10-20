import type { TextStyle } from 'react-native';

type FontWeight = NonNullable<TextStyle['fontWeight']>;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const satisfies Record<string, FontWeight>;

interface TypeStyle {
  readonly fontSize: number;
  readonly lineHeight: number;
  readonly fontWeight: FontWeight;
}

// Font families aren't set yet: the planned fonts (Readex Pro for display
// text and numbers, IBM Plex Sans Arabic for body text, both covering Arabic
// and Latin) still need bundling. Until then text uses the system font.
export const typography = {
  // Headline percentages, such as weekly consistency.
  displayLarge: {
    fontSize: 48,
    lineHeight: 52,
    fontWeight: fontWeights.semibold,
  },
  // Big numbers, such as calories left.
  display: { fontSize: 34, lineHeight: 40, fontWeight: fontWeights.semibold },
  // Screen titles.
  title1: { fontSize: 30, lineHeight: 36, fontWeight: fontWeights.semibold },
  // Sheet titles.
  title2: { fontSize: 24, lineHeight: 30, fontWeight: fontWeights.semibold },
  // Section titles.
  title3: { fontSize: 20, lineHeight: 26, fontWeight: fontWeights.semibold },
  // Card titles.
  headline: { fontSize: 17, lineHeight: 22, fontWeight: fontWeights.semibold },
  body: { fontSize: 15, lineHeight: 20, fontWeight: fontWeights.regular },
  bodyStrong: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: fontWeights.semibold,
  },
  // Card labels.
  subhead: { fontSize: 13, lineHeight: 18, fontWeight: fontWeights.regular },
  // Secondary details.
  footnote: { fontSize: 12, lineHeight: 16, fontWeight: fontWeights.regular },
  // Tab labels and small units.
  caption: { fontSize: 11, lineHeight: 14, fontWeight: fontWeights.regular },
} as const satisfies Record<string, TypeStyle>;

export type TypographyName = keyof typeof typography;
