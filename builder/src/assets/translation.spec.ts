import test from "node:test";
import assert from "node:assert";
import { importTranslations } from "./importTranslations";

const { fr, en } = importTranslations();

test("should get all fr translations", (t) => {
  assert.equal(fr["knig-p1"], "Pas par le flanc");
  assert.equal(fr["knig-a7"], "Un pour tous");
  assert.equal(
    fr["sorc-desc"],
    "Ces archi-mages dévastent sans distinction aucune tout le champ de bataille avec une puissance élémentaire brute."
  );
  assert.equal(
    fr["demk-c1-desc"],
    "$t(counter-offensive-action) par une unité à distance $t(counter-by-inflicting) $t(addnegative)."
  );
  assert.equal(fr["alch-a1"], "$t(barrier-spell) Massive");
  assert.equal(fr["samu-a1"], "Longue portée");
});

test("should get all en translations", (t) => {
  assert.equal(
    en["merc-p2-desc"],
    "$t(increase-character-opener) base maximum $t(hp) value by {{power}}%."
  );
  assert.equal(en["knig-p1"], "No Flank");
  assert.equal(en["knig-a7"], "One for All");
  assert.equal(
    en["sorc-desc"],
    "These archmages indiscriminately lay waste to the entire battlefield with raw elemental power."
  );
  assert.equal(
    en["demk-c1-desc"],
    "$t(counter-offensive-action) by a unit from range $t(counter-by-inflicting) $t(addnegative)."
  );
  assert.equal(en["alch-a1"], "$t(term-mass) $t(barrier-spell)");
});
