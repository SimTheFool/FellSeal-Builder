import { newUnvalidatedCharacter } from "@fixtures/characters";
import assert from "node:assert";
import test from "node:test";

import { commands, queries } from "./index.js";

const domi = newUnvalidatedCharacter("Domi");
const julian = newUnvalidatedCharacter("Julian");
const maga = newUnvalidatedCharacter("Maga");
const este = newUnvalidatedCharacter("Este");
const davad = newUnvalidatedCharacter("Davad");
const artie = newUnvalidatedCharacter("Artie");

test("should save character", (t) => {
  const result = commands.persistCharacters([domi]);
  if (!result.isOk()) assert.fail();
  assert.strictEqual(result.getOk(), undefined);
});

test("should get characters at subscribe", async (t) => {
  const characterRefetchPromise = new Promise((res, rej) =>
    queries.getAllCharacters.on(
      (characters) => res(characters),
      (err) => assert.fail("could not get characters")
    )
  );

  await characterRefetchPromise;
});

/* 
test("should trigger third times query when characters change twice", async (t) => {
  const tracker = new assert.CallTracker();
  const handleCharacterChange = () => {};
  const trackedCharacterChange = tracker.calls(handleCharacterChange, 3);

  const query = queries.getAllCharacters.on(trackedCharacterChange);
  commands.persistCharacters([maga]);
  commands.persistCharacters([julian]);

  tracker.verify();
});

test("should not trigger when unsusbribed", async (t) => {
  const tracker = new assert.CallTracker();
  const handleCharacterChange = () => {};
  const trackedCharacterChange = tracker.calls(handleCharacterChange, 2);

  const { unsusbribe } = queries.getAllCharacters.on(trackedCharacterChange);

  commands.persistCharacters([este]);
  unsusbribe();
  commands.persistCharacters([davad]);

  tracker.verify();
});



test("should get characters at save", async (t) => {
  const characterRefetchPromise = new Promise((res, rej) =>
    queries.getAllCharacters.on((characters) => {
      if (!characters.isOk()) assert.fail();

      const savedArtie = characters.pipe((chars) =>
        chars.find((c) => c.name === artie.name)
      );

      if (!savedArtie.isOk()) assert.fail();
      if (!savedArtie.getOk()) return;

      assert.deepStrictEqual(savedArtie, artie);
    })
  );

  await characterRefetchPromise;
});
 */
