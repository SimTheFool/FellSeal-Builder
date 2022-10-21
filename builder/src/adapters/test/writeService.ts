import { Character } from "@domain/character/Character.js";
import { newAppResult } from "@utils/result/Result.js";
import { characters as fakeCharacters } from "../../../fixtures/characters.js";
import { WriteService } from "../writeService.js";

const charactersDB = fakeCharacters.map(
  (c): Character => ({
    ...c,
  })
);

const persistCharacters = (characters: Character[]) => {
  charactersDB.push(...characters);
  return newAppResult(undefined);
};

export const writeService: WriteService = {
  persistCharacters,
};
