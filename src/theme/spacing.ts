// A 4-point scale for padding, margins and gaps.
export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const satisfies Record<string, number>;

export type SpacingName = keyof typeof spacing;
