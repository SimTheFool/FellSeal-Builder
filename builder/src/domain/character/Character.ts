import { Job } from "@domain/Job";
import { PassiveSkill } from "@domain/Skill";
import { NominalString } from "utils";

type Id = NominalString<"character_id">;
type Name = NominalString<"character_name">;
type Passive = readonly [job: Job["hash"], skill: PassiveSkill["name"]];

export type Character = {
  id: Id;
  name?: Name;
  job: Job["hash"];
  ability: Job["hash"];
  passives: readonly [Passive, Passive];
};

export type UnvalidatedCharacter = {
  name?: string;
  job?: Job["hash"];
  ability?: Job["hash"];
  passives?: readonly [Passive | undefined, Passive | undefined];
};

export type CharacterId = Id;
