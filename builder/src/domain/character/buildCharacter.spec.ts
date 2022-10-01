import test from "ava";
import { buildCharacter } from "./buildCharacter.js";

type UnvalidatedCharacter = Parameters<typeof buildCharacter>[0];

const fakeCharacter: UnvalidatedCharacter = {
  main: "lich",
  active: "druid",
  passives: ["01", "02"],
};

/* const fakeCharacterWithoutMain = {
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
}; */

test("should build character with a class, actives and passives", (t) => {
  const maybeCharacter = buildCharacter(fakeCharacter);

  if (Array.isArray(maybeCharacter)) {
    t.fail(maybeCharacter.join("--"));
    return;
  }

  const { name, main, active, passives } = maybeCharacter;
  t.is(name, fakeCharacter.name as any);
  t.is(main, fakeCharacter.main as any);
  t.is(active, fakeCharacter.active as any);
  t.is(passives, fakeCharacter.passives as any);
});
