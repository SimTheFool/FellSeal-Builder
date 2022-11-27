import assert from "node:assert";
import test from "node:test";
import jobs_gamedata from "./gameData/jobs.gdata";
import skills_gamedata from "./gameData/skills.gdata";

test("should get skills", (t) => {
  console.log("###", skills_gamedata);

  /* const knigA1 = skills_gamedata.find((s) => s.hash === "knig-a1");
  assert.equal(knigA1?.description, "knig-a1-desc");
  assert.equal(knigA1?.hash, "knig-a1");
  assert.equal(knigA1?.name, "knig-a1-title");
  assert.equal(knigA1?.type, "active") */
  assert.equal(2, 3);
});

/* test("should get jobs", (t) => {
  console.log("+++", jobs_gamedata);
  assert.equal(2, 3);
}); */
