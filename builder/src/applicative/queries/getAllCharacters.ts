import { ReadService } from "adapters/readService";

export const getAllCharacters = (readService: ReadService) => {
  return readService.getAllCharacters();
};
