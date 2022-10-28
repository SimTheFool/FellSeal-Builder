import test from "node:test";
import assert from "node:assert";
import {
  characters as fakeCharacters,
  newUnvalidatedCharacter,
} from "fixtures/characters";

import { commands, queries } from "./index";

const domi = newUnvalidatedCharacter();

test("should get all characters", (t) => {
  const charactersResult = queries.getAllCharacters().get();

  if (!charactersResult.isOk()) assert.fail();

  const characters = charactersResult.getOk();
  characters.forEach((c) => {
    const fakeCharacter = fakeCharacters.find((f) => f.id === c.id);
    assert.deepStrictEqual(c, fakeCharacter);
  });
});

test("should save character and return id", (t) => {
  const result = commands.persistCharacters([domi]);
  if (!result.isOk()) assert.fail();
  assert.strictEqual(result.getOk(), undefined);
});

/* 

test("should listen to character change", async (t) => {
  const characterRefetchPromise = new Promise((res, rej) =>
    queries.getCharacter([julian.id]).listen((val) => res(val))
  );

  const updatedJulian = {
    ...julian,
    active: "druid",
  };
  Character.persist([updatedJulian]);
  const character = await characterRefetchPromise;
  if (!character.isOk()) {
    assert.fail();
  }

  assert.deepStrictEqual(character.isOk(), updatedJulian);
}); */
