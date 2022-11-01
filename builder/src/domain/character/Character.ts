import { Job } from "@domain/Job";
import { PassiveSkill } from "@domain/Skill";
import { NominalString } from "utils";

type Id = NominalString<"character_id">;
type Name = NominalString<"character_name">;
type Passive = readonly [job: Job["name"], skill: PassiveSkill["name"]];

export type Character = {
  id: Id;
  name?: Name;
  main: Job["name"];
  active: Job["name"];
  passives: readonly [Passive, Passive];
};

export type UnvalidatedCharacter = {
  name?: string;
  main?: Job["name"];
  active?: Job["name"];
  passives?: readonly [Passive | undefined, Passive | undefined];
};

export type CharacterId = Id;
