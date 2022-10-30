import { Character } from "@domain/character/Character";

const newTestDb = () => {
  return {
    characters: [] as Character[],
  };
};

export const testDb = newTestDb();
