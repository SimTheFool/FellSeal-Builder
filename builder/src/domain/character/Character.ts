import { Job } from "@domain/Job";
import { CounterSkill, PassiveSkill } from "@domain/Skill";
import { NominalString } from "utils";

type Id = NominalString<"character_id">;
type Name = NominalString<"character_name">;
type Passive = readonly [job: Job["hash"], skill: PassiveSkill["hash"]];
type Counter = readonly [job: Job["hash"], skill: CounterSkill["hash"]];

export type CharacterTag =
  | "support"
  | "tank"
  | "heal"
  | "physical"
  | "magickal"
  | "alteration"
  | "mobility"
  | "special";

export type Character = {
  id: Id;
  position: number;
  name: Name;
  job: Job["hash"];
  ability: Job["hash"];
  passives: readonly [Passive, Passive];
  counter: Counter;
  portrait: string;
  tags?: CharacterTag[];
};

export type UnvalidatedCharacter = {
  name?: string;
  job?: Job["hash"];
  ability?: Job["hash"];
  passives?: readonly [Passive | undefined, Passive | undefined];
  counter?: Counter;
  portrait?: string;
  tags?: CharacterTag[];
};

export type CharacterId = Id;
