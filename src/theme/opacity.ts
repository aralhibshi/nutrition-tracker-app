// Opacity for states that dim an element.
export const opacity = {
  disabled: 0.4,
  muted: 0.35,
} as const satisfies Record<string, number>;

export type OpacityName = keyof typeof opacity;
