import test from "node:test";
import assert from "node:assert";
import { newUnvalidatedCharacter } from "@fixtures/characters.js";
import { writeService } from "@services/writeService.js";
import { addCharacter } from "./addCharacter.js";

test("should add character and return an identifier", (t) => {
  const result = addCharacter(newUnvalidatedCharacter(), writeService);
  if (result.isErrors()) assert.fail();
  assert.strictEqual(typeof result.getOk(), "string");
});
