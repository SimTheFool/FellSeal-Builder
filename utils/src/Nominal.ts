export type Nominal<T, B> = T & { __brand: B };
export type NominalString<B> = Nominal<string, B>;
export type NominalNumber<B> = Nominal<number, B>;
