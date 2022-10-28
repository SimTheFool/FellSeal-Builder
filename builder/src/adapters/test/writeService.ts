import { Character } from "@domain/character/Character";
import { newAppResult } from "@utils/result/Result";
import { characters as fakeCharacters } from "../../fixtures/characters";
import { WriteService } from "../writeService";

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
