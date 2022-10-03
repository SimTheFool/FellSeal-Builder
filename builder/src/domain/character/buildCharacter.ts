import { DomainError, newDomainError } from "@domain/utils/DomainError.js";
import { newDomainResult } from "@domain/utils/DomainResult.js";
import { entries } from "utils";
import { Character, UnvalidatedCharacter } from "./Character.js";

export const buildCharacter = (unvalidatedCharacter: UnvalidatedCharacter) => {
  const errors = entries(unvalidatedCharacter).reduce(
    (errors, [key, value]) => {
      const validators = validatorMap[key];
      if (!validators) return [...errors];

      const newErrors = validators
        .map((v) => v(value as any))
        .filter((e): e is DomainError => e !== undefined);

      return [...errors, ...newErrors];
    },
    [] as DomainError[]
  );

  if (errors.length > 0) return newDomainResult(errors);
  return newDomainResult(unvalidatedCharacter as Character);
};

type Validator<K extends keyof UnvalidatedCharacter> = (
  value: UnvalidatedCharacter[K]
) => DomainError | undefined;

type ValidatorMap = {
  [K in keyof UnvalidatedCharacter]: Validator<K>[];
};

const validatorMap: ValidatorMap = {
  main: [
    (v) => {
      if (!v) return newDomainError("character_no_main");
    },
  ],
};
