import test from "node:test";
import assert from "node:assert";
import { newUnvalidatedCharacter } from "@fixtures/characters.js";
import { addCharacter } from "./addCharacter.js";
import { writeService } from "@adapters/writeService.js";

test("should add character and return an identifier", (t) => {
  const result = addCharacter(newUnvalidatedCharacter(), writeService);
  if (result.isErrors()) assert.fail();
  assert.strictEqual(typeof result.getOk(), "string");
});
