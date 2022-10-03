import test from "ava";
import { buildCharacter } from "./buildCharacter.js";

const fakeCharacter = {
  main: "lich",
  active: "druid",
  passives: ["01", "02"] as const,
};

const fakeCharacterWithoutClass = {
  ...fakeCharacter,
  main: undefined,
};

test("should build with a class, actives and passives", (t) => {
  const maybeCharacter = buildCharacter(fakeCharacter);

  t.is(maybeCharacter.isOk(), true);
  t.is(maybeCharacter.isError(), false);
});

test("should return error without a class", (t) => {
  const maybeCharacter = buildCharacter(fakeCharacterWithoutClass);

  t.is(maybeCharacter.isError(), true);
  t.is(maybeCharacter.isOk(), false);
});
