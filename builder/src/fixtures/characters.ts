import {
  Character,
  UnvalidatedCharacter,
} from "@domain/character/Character.js";

export const characters = [
  {
    id: "001",
    position: 0,
    portrait: "4-Large.png",
    name: "Julian",
    job: "lich",
    ability: "drui",
    passives: [
      ["knig", "knig-p1"],
      ["blad", "blad-p1"],
    ] as const,
    counter: ["gunn", "gunn-c1"],
  },
  {
    id: "002",
    position: 1,
    portrait: "3-Large.png",
    name: "Axel",
    job: "temp",
    ability: "sorc",
    passives: [
      ["lich", "lich-p1"],
      ["drui", "drui-p1"],
    ] as const,
    counter: ["alch", "alch-c1"],
  },
] as unknown as Character[];

export const newUnvalidatedCharacter = (
  name: string
): UnvalidatedCharacter => ({
  name: name,
  job: "alch",
  ability: "drui",
  passives: [
    ["wiza", "wiza-p2"],
    ["knig", "knig-p1"],
  ] as const,
  counter: ["wiza", "wiza-c1"],
});
