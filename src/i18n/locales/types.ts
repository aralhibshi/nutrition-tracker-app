import type en from './en';

type Shape<T> = {
  readonly [K in keyof T]: T[K] extends string ? string : Shape<T[K]>;
};

/** English is the source of truth: every other language has the same keys. */
export type Translations = Shape<typeof en>;
