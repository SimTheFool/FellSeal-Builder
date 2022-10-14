import { characters as fakeCharacters } from "../../../../fixtures/characters.js";
import { PersistCharacterService } from "../persistCharacter.js";
import { v4 as uuid } from "uuid";
import { Character } from "@domain/character/Character.js";
import { newAppResult } from "@utils/Result.js";

const characters = fakeCharacters.map((c): Character & { id: string } => ({
  ...c,
  id: uuid(),
}));

export const persistCharacter: PersistCharacterService = (character) => {
  const newId = uuid();
  characters.push({ ...character, id: newId });
  return newAppResult(newId);
};
