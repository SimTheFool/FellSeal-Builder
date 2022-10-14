import { newAppError } from "utils/Error.js";

export const CHARACTER_BUILD_ERRORS = {
  MISSING_MAIN: newAppError("character_missing_main"),
  MISSING_ACTIVE: newAppError("character_missing_active"),
  MISSING_PASSIVE: newAppError("character_missing_passive"),
};

export type CharacterBuildError =
  typeof CHARACTER_BUILD_ERRORS[keyof typeof CHARACTER_BUILD_ERRORS];
