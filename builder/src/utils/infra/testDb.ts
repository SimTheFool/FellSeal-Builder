import { Character } from "@domain/character/Character";
import { Job } from "@domain/Job";
import { Skill } from "@domain/Skill";

const newTestDb = () => {
  return {
    characters: [] as Character[],
    jobs: [] as Job[],
    skills: [] as Skill[],
    translations: {} as Record<"en" | "fr", Record<string, string>>,
  };
};

export const testDb = newTestDb();
