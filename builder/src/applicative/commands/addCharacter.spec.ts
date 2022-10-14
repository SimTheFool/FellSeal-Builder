import { newUnvalidatedCharacter } from "@fixtures/characters.js";
import { persistCharacter } from "@services/persistCharacter.js";
import test from "ava";
import { addCharacter } from "./addCharacter.js";

test("should add character and return an identifier", (t) => {
  const characterId = addCharacter(newUnvalidatedCharacter(), persistCharacter);
  t.is(typeof characterId, "string");
});
