export const portraitHeight = 340;
export const portraitWidth = 228;

export const mediaQuery = {
  enoughHeight: {
    media: `@media (min-height: ${1.4 * portraitHeight}px)`,
    value: `(min-height: ${1.4 * portraitHeight}px)`,
  },
  hugeHeight: {
    media: `@media (min-height: ${860}px)`,
    value: `(min-height: ${860}px)`,
  },
};
