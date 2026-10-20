// Corner radii, from small tags up to full pills and circles.
export const radius = {
  none: 0,
  sm: 8, // tags, small swatches
  md: 12, // icon tiles, small buttons
  lg: 16, // buttons, inputs
  xl: 20, // compact cards, list items
  xxl: 28, // cards
  sheet: 32, // top corners of bottom sheets
  full: 999, // pills, circles
} as const satisfies Record<string, number>;

export type RadiusName = keyof typeof radius;
