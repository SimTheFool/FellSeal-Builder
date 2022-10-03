import { NominalString, Nominal } from "utils";

export type Character = {
  name?: Name;
  main: Main;
  active: Active;
  passives: readonly [Passive, Passive];
};

export type UnvalidatedCharacter = {
  name?: string;
  main?: unknown;
  active?: unknown;
  passives?: readonly [unknown, unknown];
};

type Name = NominalString<"character_name">;
type Main = Nominal<number, "character_main">;
type Active = Nominal<unknown, "character_active">;
type Passive = Nominal<unknown, "character_passive">;
