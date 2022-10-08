import { DomainError, newDomainError } from "@domain/utils/DomainError.js";

export const CHARACTER_BUILD_ERRORS = {
  MISSING_MAIN: newDomainError("character_missing_main"),
  MISSING_ACTIVE: newDomainError("character_missing_active"),
  MISSING_PASSIVE: newDomainError("character_missing_passive"),
};

export type CharacterBuildError =
  typeof CHARACTER_BUILD_ERRORS[keyof typeof CHARACTER_BUILD_ERRORS];
