// Raw colour values. Only the semantic colours below should reference these;
// components use the semantic names, so a light theme only changes the mapping.
const palette = {
  black: '#050807',
  gray950: '#0B0F0E',
  gray900: '#151B19',
  gray850: '#1A211F',
  gray800: '#1D2522',
  gray750: '#1F2925',
  gray700: '#26302C',
  gray650: '#2A3430',
  gray600: '#2E3A36',
  gray500: '#5A6662',
  gray400: '#8A9691',
  gray300: '#9AA7A1',
  gray200: '#C3CEC9',
  gray50: '#F2F5F3',

  mint400: '#5EE6B5',
  gold400: '#F2C14E',
  gold950: '#2A2614',
  coral400: '#FF8F9C',
  amber400: '#F5B83D',
  lavender400: '#B79CFF',
  sky300: '#8FD8FF',
  sky400: '#4CC3FF',
  sky950: '#12324A',
  orange400: '#FF9F5A',
  orange950: '#3A2416',
} as const satisfies Record<string, string>;

/** Dark theme, the app's only theme for now. */
export const colors = {
  // Backgrounds, from the page up.
  background: palette.gray950,
  surface: palette.gray900,
  surfaceRaised: palette.gray800,
  surfaceFloating: palette.gray850,
  backdrop: palette.black,

  // Lines and tracks.
  border: palette.gray750,
  borderStrong: palette.gray650,
  track: palette.gray700,
  trackStrong: palette.gray600,

  // Text, from most to least prominent.
  text: palette.gray50,
  textSecondary: palette.gray200,
  textMuted: palette.gray300,
  textSubtle: palette.gray400,
  textDisabled: palette.gray500,

  // Brand and actions.
  accent: palette.mint400,
  onAccent: palette.gray950,
  danger: palette.coral400,

  // Fasting and Ramadan.
  fasting: palette.gold400,
  fastingSurface: palette.gold950,

  // One colour per tracked value, used for its rings, bars and labels.
  calories: palette.mint400,
  protein: palette.coral400,
  carbs: palette.amber400,
  fat: palette.lavender400,
  water: palette.sky400,
  waterSurface: palette.sky950,
  onWaterSurface: palette.sky300,
  steps: palette.orange400,
  stepsSurface: palette.orange950,

  // Progress against a target.
  met: palette.mint400,
  close: palette.amber400,
  missed: palette.coral400,
} as const satisfies Record<string, string>;

export type ColorName = keyof typeof colors;
