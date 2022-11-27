import test from "node:test";
import assert from "node:assert";
import skill_fr_translations from "./translations/fr/skills.tra";

test("should get translations", (t) => {
  assert.equal(skill_fr_translations["knig-p1"], "Pas par le flanc");
  assert.equal(skill_fr_translations["knig-a7"], "Un pour tous");
  assert.equal(
    skill_fr_translations["sorc-desc"],
    "Ces archi-mages dévastent sans distinction aucune tout le champ de bataille avec une puissance élémentaire brute."
  );
  assert.equal(
    skill_fr_translations["demk-c1-desc"],
    "$t(counter-offensive-action) par une unité à distance $t(counter-by-inflicting) $t(addnegative)."
  );
  assert.equal(skill_fr_translations["alch-a1"], "$t(barrier-spell) Massive");
});
