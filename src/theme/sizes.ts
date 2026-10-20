// Fixed sizes shared across components.
export const sizes = {
  touchTarget: 44, // smallest tappable size (Apple and Android guidelines)
  buttonHeight: 48,
  inputHeight: 52,
  tabBarHeight: 72,
  addButton: 60, // the + button in the tab bar
  iconSmall: 16,
  iconMedium: 20,
  iconLarge: 22,
  iconTile: 44, // rounded square behind an icon
} as const satisfies Record<string, number>;

export type SizeName = keyof typeof sizes;
