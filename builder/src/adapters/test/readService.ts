import { Character, CharacterId } from "@domain/character/Character";
import { newAppResult } from "@utils/result/Result";
import { v4 as uuid } from "uuid";
import { characters as fakeCharacters } from "../../fixtures/characters";
import { ReadService } from "../readService";

const characters = fakeCharacters.map(
  (c): Character => ({
    ...c,
  })
);

const getAllCharacters = () => {
  return newAppResult(characters);
};

export const readService: ReadService = {
  getAllCharacters,
};
