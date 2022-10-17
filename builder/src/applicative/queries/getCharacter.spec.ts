import test from "node:test";
import assert from "node:assert";
import { characters } from "@fixtures/characters.js";
import { readService } from "@services/readService";
import { getCharacter } from "./getCharacter";

test("should get character from identifier", (t) => {
  const dbCharacter = characters[0];
  const { id } = dbCharacter;

  const character = getCharacter(id, readService);
  if (character.isErrors()) assert.fail();
  assert.deepStrictEqual(character.getOk(), dbCharacter);
});
