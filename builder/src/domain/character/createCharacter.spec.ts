import test from "ava";
import { createCharacter } from "./createCharacter.js";

const fakeCharacter: Parameters<typeof createCharacter>[0] = {
  main: "lich",
  active: "druid",
  passives: ["01", "02"],
};

test("should create character with a class, actives and passives", (t) => {
  const { active, passives, main } = createCharacter(fakeCharacter);

  t.is(main, fakeCharacter.main);
  t.is(active, fakeCharacter.active);
  t.is(passives, fakeCharacter.passives);
});
