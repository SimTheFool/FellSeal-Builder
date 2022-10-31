import { newUnvalidatedCharacter } from "@fixtures/characters";
import assert from "node:assert";
import test from "node:test";
import { newClient } from "./index.js";

const domi = newUnvalidatedCharacter("Domi");
const julian = newUnvalidatedCharacter("Julian");
const maga = newUnvalidatedCharacter("Maga");
const este = newUnvalidatedCharacter("Este");
const davad = newUnvalidatedCharacter("Davad");
const artie = newUnvalidatedCharacter("Artie");

test("should save character", (t) => {
  const { commands } = newClient();
  const result = commands.persistCharacters([domi]);
  if (!result.isOk()) assert.fail();
  assert.strictEqual(result.getOk(), undefined);
});

test("should get characters at subscribe", async (t) => {
  const { queries } = newClient();
  const characterRefetchPromise = new Promise((res, rej) =>
    queries.getAllCharacters.on(
      (characters) => res(characters),
      (err) => assert.fail("could not get characters")
    )
  );

  await characterRefetchPromise;
});

test("should trigger query third times when characters change twice", async (t) => {
  const tracker = new assert.CallTracker();
  const { queries, commands } = newClient();

  const trackedCharacterChange = tracker.calls(() => {}, 3);

  queries.getAllCharacters.on(trackedCharacterChange, (err) =>
    assert.fail("could not get characters")
  );
  commands.persistCharacters([maga]);
  commands.persistCharacters([julian]);

  tracker.verify();
});

test("should not trigger when unsusbribed", async (t) => {
  const tracker = new assert.CallTracker();
  const { queries, commands } = newClient();

  const trackedCharacterChange = tracker.calls(() => {}, 2);

  const unsusbribe = queries.getAllCharacters.on(
    trackedCharacterChange,
    (err) => assert.fail("could not get characters")
  );

  commands.persistCharacters([este]);
  unsusbribe();
  commands.persistCharacters([davad]);

  tracker.verify();
});

test("should get characters at save", async (t) => {
  const { queries, commands } = newClient();
  const waitForArtie = new Promise((res, rej) =>
    queries.getAllCharacters.on(
      (characters) => {
        const savedArtie = characters.find((c) => c.name === artie.name);
        if (!savedArtie) return;
        res(savedArtie);
      },
      (err) => assert.fail("could not get characters")
    )
  );
  commands.persistCharacters([artie]);
  const savedArtie = await waitForArtie;
  assert.deepStrictEqual(savedArtie, artie);
});
