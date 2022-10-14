import {
  Character,
  UnvalidatedCharacter,
} from "@domain/character/Character.js";

export const characters = [
  {
    name: "Julian",
    main: "lich",
    active: "druid",
    passives: ["01", "02"] as const,
  },
] as unknown as Character[];

export const newUnvalidatedCharacter = (): UnvalidatedCharacter => ({
  name: "Domi",
  main: "thief",
  active: "mercenary",
  passives: ["03", "04"] as const,
});
