import { DomainError, isDomainError } from "@domain/DomainError.js";
import { NominalString } from "utils/Types";

export type CharacterBuildingError<A extends string = string> = DomainError<
  string & { __error: A },
  "character_building_error"
>;
export const isCharacterBuildingError = (
  input: unknown
): input is CharacterBuildingError => {
  if (!isDomainError(input)) return false;
  if (input.__domainError !== "character_building_error") return false;
  return true;
};

type NoMainError = CharacterBuildingError<"build_character_no_main_error">;
type NoActiveError = CharacterBuildingError<"build_character_no_active_error">;
type NoPassivesError =
  CharacterBuildingError<"build_character_no_passives_error">;

export const noMainError = "no_main_error" as NoMainError;
export const noActiveError = "no_active_error" as NoActiveError;
export const noPassivesError = "no_passives_error" as NoPassivesError;
