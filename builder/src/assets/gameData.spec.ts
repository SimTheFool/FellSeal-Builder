import assert from "node:assert";
import test from "node:test";
import jobs_gamedata from "./gameData/jobs.gdata";
import skills_gamedata from "./gameData/skills.gdata";

test("should get skills", (t) => {
  const knigA1 = skills_gamedata.find((s) => s.hash === "knig-a1");
  assert.equal(knigA1?.hash, "knig-a1");
  assert.equal(knigA1?.name, "knig-a1");
  assert.equal(knigA1?.description, "knig-a1-desc");
  assert.equal(knigA1?.type, "active");
});

test("should get jobs", (t) => {
  const knig = jobs_gamedata.find((j) => j.hash === "knig");
  assert.equal(knig?.hash, "knig");
  assert.equal(knig?.title, "knig-title");
  assert.equal(knig?.description, "knig-desc");
  assert.ok(knig?.skills.includes("knig-a1"));
  assert.ok(knig?.skills.includes("knig-a2"));
  assert.ok(knig?.skills.includes("knig-a3"));
  assert.ok(knig?.skills.includes("knig-a4"));
  assert.ok(knig?.skills.includes("knig-a5"));
  assert.ok(knig?.skills.includes("knig-a6"));
  assert.ok(knig?.skills.includes("knig-a7"));
  assert.ok(knig?.skills.includes("knig-p1"));
  assert.ok(knig?.skills.includes("knig-p2"));
  assert.ok(knig?.skills.includes("knig-c1"));
  assert.equal(knig?.type, "character");
});
