import { Character } from "@domain/character/Character.js";
import { newAppResult } from "@utils/Result.js";
import { v4 as uuid } from "uuid";
import { characters as fakeCharacters } from "../../../fixtures/characters.js";
import { WriteService } from "../writeService.js";

const characters = fakeCharacters.map(
  (c): Character => ({
    ...c,
  })
);

const persistCharacters = (characters: Character[]) => {
  characters.push(...characters);
  return newAppResult<void>();
};

export const writeService: WriteService = {
  persistCharacters,
};
