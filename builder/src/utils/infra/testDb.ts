import { Character } from "@domain/character/Character";
import { Job } from "@domain/Job";

const newTestDb = () => {
  return {
    characters: [] as Character[],
    jobs: [] as Job[],
    translations: {} as Record<"en" | "fr", Record<string, string>>,
  };
};

export const testDb = newTestDb();
