import test from "ava";
import { buildCharacter } from "./buildCharacter.js";

const fakeCharacter = {
  main: "lich",
  active: "druid",
  passives: ["01", "02"] as const,
};

test("should build with a class, actives and passives", (t) => {
  const maybeCharacter = buildCharacter(fakeCharacter);

  t.is(maybeCharacter.isOk(), true);
});
