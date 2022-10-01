import test from "ava";
import { buildCharacter } from "./buildCharacter.js";

const fakeCharacter: Parameters<typeof buildCharacter>[0] = {
  main: "lich",
  active: "druid",
  passives: ["01", "02"],
};

test("should build character with a class, actives and passives", (t) => {
  const { active, passives, main } = buildCharacter(fakeCharacter);

  t.is(main, fakeCharacter.main);
  t.is(active, fakeCharacter.active);
  t.is(passives, fakeCharacter.passives);
});
