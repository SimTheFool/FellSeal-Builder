import { Character, CharacterId } from "@domain/character/Character.js";
import { newAppResult } from "@utils/Result.js";
import { v4 as uuid } from "uuid";
import { characters as fakeCharacters } from "../../../../fixtures/characters.js";
import { ReadService } from "../readService.js";
import { WriteService } from "../writeService.js";

const characters = fakeCharacters.map(
  (c): Character => ({
    ...c,
  })
);

export const readService: ReadService = (characterId: CharacterId) => {
  const character = characters.find((c) => c.id === characterId);
  return newAppResult(character);
};
