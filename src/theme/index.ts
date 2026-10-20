import { colors } from './colors';
import { opacity } from './opacity';
import { radius } from './radius';
import { sizes } from './sizes';
import { spacing } from './spacing';
import { fontWeights, typography } from './typography';

/** Design tokens. Components take every colour, size and gap from here. */
export const theme = {
  colors,
  spacing,
  radius,
  typography,
  fontWeights,
  sizes,
  opacity,
} as const;

export type Theme = typeof theme;

export type { ColorName } from './colors';
export type { OpacityName } from './opacity';
export type { RadiusName } from './radius';
export type { SizeName } from './sizes';
export type { SpacingName } from './spacing';
export type { TypographyName } from './typography';
