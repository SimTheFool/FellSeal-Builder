import test from "node:test";
import assert from "node:assert";
import { buildCharacter } from "./buildCharacter";
import { CHARACTER_BUILD_ERRORS } from "./Errors";

const fakeCharacter = {
  main: "lich",
  active: "druid",
  passives: ["01", "02"] as const,
};

const fakeCharacterWithoutMain = {
  ...fakeCharacter,
  main: undefined,
};

const fakeCharacterWithoutActive = {
  ...fakeCharacter,
  active: undefined,
};

const fakeCharacterWithoutPassives = {
  ...fakeCharacter,
  passives: undefined,
};

const fakeCharacterMissingOnePassive = {
  ...fakeCharacter,
  passives: ["01", undefined] as const,
};

test("should build with a main, actives and passives", (t) => {
  const maybeCharacter = buildCharacter(fakeCharacter);

  maybeCharacter.map(
    () => assert.ok(true),
    () => assert.fail()
  );
});

test("should return a MISSING_MAIN_ERROR when no main", (t) => {
  const maybeCharacter = buildCharacter(fakeCharacterWithoutMain);

  maybeCharacter.map(
    () => assert.fail(),
    () => assert.ok(true)
  );

  assert.strictEqual(
    maybeCharacter.hasError(CHARACTER_BUILD_ERRORS.MISSING_MAIN),
    true
  );
});

test("should return a MISSING_ACTIVE_ERROR when no active", (t) => {
  const maybeCharacter = buildCharacter(fakeCharacterWithoutActive);

  maybeCharacter.map(
    () => assert.fail(),
    () => assert.ok(true)
  );

  assert.strictEqual(
    maybeCharacter.hasError(CHARACTER_BUILD_ERRORS.MISSING_ACTIVE),
    true
  );
});

test("should return a MISSING_PASSIVE_ERROR when no passive", (t) => {
  const maybeCharacter = buildCharacter(fakeCharacterWithoutPassives);
  maybeCharacter.map(
    () => assert.fail(),
    () => assert.ok(true)
  );

  assert.strictEqual(
    maybeCharacter.hasError(CHARACTER_BUILD_ERRORS.MISSING_PASSIVE),
    true
  );
});

test("should return a MISSING_PASSIVE_ERROR when missing one passive", (t) => {
  const maybeCharacter = buildCharacter(fakeCharacterMissingOnePassive);
  maybeCharacter.map(
    () => assert.fail(),
    () => assert.ok(true)
  );

  assert.strictEqual(
    maybeCharacter.hasError(CHARACTER_BUILD_ERRORS.MISSING_PASSIVE),
    true
  );
});
