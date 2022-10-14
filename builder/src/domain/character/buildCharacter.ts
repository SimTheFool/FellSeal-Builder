import { AppResult, newAppResult } from "@utils/Result.js";
import { entries } from "utils";
import { Character, UnvalidatedCharacter } from "./Character.js";
import { CharacterBuildError, CHARACTER_BUILD_ERRORS } from "./Errors.js";

export const buildCharacter = (
  unvalidatedCharacter: UnvalidatedCharacter
): AppResult<Character, CharacterBuildError[]> => {
  const errors = entries(unvalidatedCharacter).reduce(
    (errors, [key, value]) => {
      const validators = validatorMap[key];
      if (!validators) return [...errors];

      const newErrors = validators
        .map((v) => v(value as any))
        .filter((e): e is CharacterBuildError => e !== undefined);

      return [...errors, ...newErrors];
    },
    [] as CharacterBuildError[]
  );

  if (errors.length > 0)
    return newAppResult<Character, CharacterBuildError[]>(errors);
  return newAppResult<Character, CharacterBuildError[]>(
    unvalidatedCharacter as Character
  );
};

type Validator<K extends keyof UnvalidatedCharacter> = (
  value: UnvalidatedCharacter[K]
) => CharacterBuildError | undefined;

type ValidatorMap = {
  [K in keyof UnvalidatedCharacter]: Validator<K>[];
};

const validatorMap: ValidatorMap = {
  main: [
    (v) => {
      if (!v) return CHARACTER_BUILD_ERRORS.MISSING_MAIN;
    },
  ],
  active: [
    (v) => {
      if (!v) return CHARACTER_BUILD_ERRORS.MISSING_ACTIVE;
    },
  ],
  passives: [
    (v) => {
      if (!v || v.some((passive) => !passive))
        return CHARACTER_BUILD_ERRORS.MISSING_PASSIVE;
    },
  ],
};
