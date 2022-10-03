type BaseRecord = Record<string, any>;

type EntriesMap<T extends BaseRecord> = {
  [K in keyof T]: [K, T[K]];
};

export type Entry<T extends BaseRecord> = Exclude<
  EntriesMap<T>[keyof EntriesMap<T>],
  undefined
>;

export type Entries<T extends BaseRecord> = Entry<T>[];

export const entries = <T extends BaseRecord>(obj: T) => {
  return Object.entries(obj) as Entries<T>;
};

type A = {
  a?: "ab";
  b: 1;
};

type Test = Entry<A>;
