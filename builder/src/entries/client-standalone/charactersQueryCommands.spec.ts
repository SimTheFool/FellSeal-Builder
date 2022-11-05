import {
  Character,
  UnvalidatedCharacter,
} from "@domain/character/Character.js";
import { newUnvalidatedCharacter } from "@fixtures/characters";
import assert from "node:assert";
import test from "node:test";
import { newClient } from "./index.js";
type Queries = ReturnType<typeof newClient>["queries"];

const davad = newUnvalidatedCharacter("Davad");
const maga = newUnvalidatedCharacter("Maga");
const artie = newUnvalidatedCharacter("Artie");

const trackCharactersChange = (queries: Queries, nb: number) => {
  const tracker = new assert.CallTracker();
  const trackedCharacterChange = tracker.calls(() => {}, nb);

  const unsusbribe = queries
    .getAllCharacters()
    .on(trackedCharacterChange, (err) =>
      assert.fail("could not get characters")
    );

  return [unsusbribe, tracker] as const;
};

const waitForCharacter = async (
  queries: Queries,
  character: UnvalidatedCharacter
) =>
  new Promise<[Character, Character[]]>((res, rej) =>
    queries.getAllCharacters().on(
      (characters) => {
        const savedCharacter = characters.find(
          (c) => c.name === character.name
        );
        if (!savedCharacter) return;
        res([savedCharacter, characters]);
      },
      (err) => assert.fail("could not get characters")
    )
  );

/** Tests */

test("should save character", (t) => {
  const { commands } = newClient();
  const result = commands.persistCharacters([artie]);
  if (!result.isOk()) assert.fail();
  assert.strictEqual(result.getOk(), undefined);
});

test("should get characters on subscribtion", async (t) => {
  const { queries } = newClient();
  const charactersPromise = new Promise((res, rej) =>
    queries.getAllCharacters().on(
      (characters) => res(characters),
      () => rej("could not get characters")
    )
  );

  await charactersPromise;
});

test("should get characters on change command", async (t) => {
  const { queries, commands } = newClient();
  const waitForArtie = waitForCharacter(queries, artie);
  commands.persistCharacters([artie]);
  const [savedArtie] = await waitForArtie;
  assert.deepStrictEqual(savedArtie, artie);
});

test("should trigger query third times when characters change twice", async (t) => {
  const { queries, commands } = newClient();
  const [, tracker] = trackCharactersChange(queries, 3);

  commands.persistCharacters([maga]);
  commands.persistCharacters([artie]);

  tracker.verify();
});

test("should not trigger when unsusbribed", async (t) => {
  const { queries, commands } = newClient();
  const [unsusbribe, tracker] = trackCharactersChange(queries, 2);

  commands.persistCharacters([artie]);
  unsusbribe();
  commands.persistCharacters([davad]);

  tracker.verify();
});

test("should add empty new character with only position 0 and id", async (t) => {
  const { queries, commands } = newClient();
  const waitForEmpty = waitForCharacter(queries, {});
  commands.addNewCharacter({});
  const [savedEmpty] = await waitForEmpty;
  assert.equal(savedEmpty.position, 0);
  assert.equal(typeof savedEmpty.id, "string");
  assert.ok(!savedEmpty.job);
  assert.ok(!savedEmpty.ability);
  assert.ok(!savedEmpty.passives);
  assert.ok(!savedEmpty.portrait);
});
