import { Character } from "@domain/character/Character.js";
import { Job } from "@domain/Job.js";
import {
  ActiveSkill,
  CounterSkill,
  PassiveSkill,
  Skill,
} from "@domain/Skill.js";
import { characters, characters as fakeCharacters } from "@fixtures/characters";
import { testDb } from "@utils/infra/testDb.js";
import { newAppResult } from "@utils/result/Result.js";
import { importJobsAndSkills } from "assets/importGameData";
import { v4 as uuid } from "uuid";
import jobsGameData from "../../assets/gameData/jobs.gdata";
import skillsGameData from "../../assets/gameData/skills.gdata";
import translation_skills_fr from "../../assets/translations/fr/skills.tra";
import { WriteService } from "../writeService.js";

export const newWriteService = (): WriteService => {
  migrate();

  return {
    persistCharacters: (newCharacters: Character[]) => {
      testDb.characters = [...newCharacters, ...characters];
      return newAppResult(undefined);
    },
    addNewCharacter: (c: Character) => {
      const newCharacters = [c, ...testDb.characters].map((c, index) => ({
        ...c,
        position: index,
        id: c.id || (uuid() as Character["id"]),
      }));
      testDb.characters = [...newCharacters];
      return newAppResult(undefined);
    },
    deleteCharacter: (id: Character["id"]) => {
      const newCharacters = testDb.characters.filter((c) => c.id !== id);
      testDb.characters = newCharacters;
      return newAppResult(undefined);
    },
    patchCharacter: (id: Character["id"], infos: Partial<Character>) => {
      const character = testDb.characters.find((c) => c.id === id);
      const newCharacters = testDb.characters.filter((c) => c.id !== id);

      testDb.characters = [
        ...newCharacters,
        {
          ...character,
          ...(infos as Character),
          id,
        },
      ];
      return newAppResult(undefined);
    },
  };
};

/** ############################ */

const migrate = () => {
  testDb.characters = fakeCharacters.map((c) => ({
    ...c,
  }));

  testDb.jobs = importJobsAndSkills();

  testDb.translations = {
    fr: {
      ...translation_skills_fr,
    },
    en: {},
  };
};
