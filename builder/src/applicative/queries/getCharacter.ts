import { CharacterId } from "@domain/character/Character";
import { ReadService } from "adapters/readService";

export const getCharacter = (
  characterId: CharacterId,
  readService: ReadService
) => {
  return readService(characterId);
};
