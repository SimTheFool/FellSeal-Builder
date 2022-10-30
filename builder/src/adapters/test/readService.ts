import { Character } from "@domain/character/Character.js";
import { newAppResult } from "@utils/result/Result.js";
import { characters as fakeCharacters } from "../../fixtures/characters.js";
import { ReadService } from "../readService.js";

const characters = fakeCharacters.map(
  (c): Character => ({
    ...c,
  })
);

export const newReadService = (): ReadService => {
  return {
    getAllCharacters: () => newAppResult(characters),
  };
};
