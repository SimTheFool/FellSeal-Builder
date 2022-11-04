import { Job } from "@domain/Job.js";
import test from "node:test";
import assert from "node:assert";
import { newClient } from "./index.js";

test("should get fr translation", async (t) => {
  const { queries } = newClient();

  const translationPromise = new Promise<Record<string, string>>((res, rej) =>
    queries.getTranslation("fr").on(
      (translations) => res(translations),
      () => rej("could not get translations")
    )
  );

  const translation = await translationPromise;
  assert.equal(translation["knig-p1"], "Pas par le flanc");
  assert.equal(translation["knig-a7"], "Un pour tous");
  assert.equal(
    translation["sorc-desc"],
    "Ces archi-mages dévastent sans distinction aucune tout le champ de bataille avec une puissance élémentaire brute."
  );
});
