import { Character } from "@domain/character/Character.js";
import { testDb } from "@utils/infra/testDb.js";
import { newAppResult } from "@utils/result/Result.js";
import { WriteService } from "../writeService.js";
import { characters, characters as fakeCharacters } from "@fixtures/characters";

export const newWriteService = (): WriteService => {
  testDb.characters = fakeCharacters.map((c) => ({
    ...c,
  }));

  return {
    persistCharacters: (newCharacters: Character[]) => {
      testDb.characters = [...newCharacters, ...characters];
      return newAppResult(undefined);
    },
  };
};
