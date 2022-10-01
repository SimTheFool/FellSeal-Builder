import { NominalString, Nominal } from "utils/Types";

export type Character = {
  name?: Name;
  main: Main;
  active: Active;
  passives: [Passive, Passive];
};

export type UnvalidatedCharacter = {
  name?: string;
  main?: unknown;
  active?: unknown;
  passives?: [unknown, unknown];
};

type Name = NominalString<"character_name">;
type Main = Nominal<number, "character_main">;
type Active = Nominal<unknown, "character_active">;
type Passive = Nominal<unknown, "character_passive">;
