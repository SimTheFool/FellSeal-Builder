import { readService } from "@adapters/readService";
import { Character, CharacterId } from "@domain/character/Character";
import { AppErrors } from "@utils/Error";
import { AppResult } from "@utils/Result";
import { getAllCharacters as getAllCharactersApplicative } from "applicative/queries/getAllCharacters";

type Query<O, E extends AppErrors = AppErrors> = {
  get: () => AppResult<O, E>;
};

const getAllCharacters = (): Query<Character[]> => {
  const get = () => getAllCharactersApplicative(readService);

  return {
    get,
  };
};

export const queries = {
  getAllCharacters,
};
