import { Character } from "@domain/character/Character";
import { Job } from "@domain/job/Job";

const newTestDb = () => {
  return {
    characters: [] as Character[],
    jobs: [] as Job[],
  };
};

export const testDb = newTestDb();
