import { Character, UnvalidatedCharacter } from "@domain/character/Character";

export const characters = [
  {
    id: "001",
    name: "Julian",
    main: "lich",
    active: "druid",
    passives: ["01", "02"] as const,
  },
  {
    id: "002",
    name: "Axel",
    main: "templar",
    active: "sorcerer",
    passives: ["03", "04"] as const,
  },
] as unknown as Character[];

export const newUnvalidatedCharacter = (): UnvalidatedCharacter => ({
  name: "Domi",
  main: "thief",
  active: "mercenary",
  passives: ["03", "04"] as const,
});
