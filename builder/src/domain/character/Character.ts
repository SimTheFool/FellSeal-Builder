import { Brand } from "utils/Types";

export type Character = {
  name?: Name;
  main: Class;
  active: Active;
  passives: [Passive, Passive];
};

type Name = Brand<string, "character_name">;
type Class = Brand<unknown, "character_class">;
type Active = Brand<unknown, "character_active">;
type Passive = Brand<unknown, "character_passive">;
