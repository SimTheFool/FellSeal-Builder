import {
  Character,
  UnvalidatedCharacter,
} from "@domain/character/Character.js";

export const characters = [
  {
    id: "001",
    name: "Julian",
    main: "LICH",
    active: "DRUI",
    passives: [
      ["KNIG", "KNIG-P1"],
      ["BLAD", "BLAD-P1"],
    ] as const,
  },
  {
    id: "002",
    name: "Axel",
    main: "TEMP",
    active: "SORC",
    passives: [
      ["LICH", "LICH-P1"],
      ["DRUI", "DRUI-P1"],
    ] as const,
  },
] as unknown as Character[];

export const newUnvalidatedCharacter = (
  name: string
): UnvalidatedCharacter => ({
  name: name,
  main: "ALCH",
  active: "DRUI",
  passives: [
    ["WIZA", "WIZA-P2"],
    ["KNIG", "KNIG-P1"],
  ] as const,
});
