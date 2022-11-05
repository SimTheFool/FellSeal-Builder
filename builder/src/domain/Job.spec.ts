import test from "node:test";
import assert from "node:assert";
import { newJob } from "./Job";

test("should have fields build from base hash", (t) => {
  const job = newJob("test", [], [], [], "character");

  assert.equal(job.title, "test-title");
  assert.equal(job.ability, "test-ability");
  assert.equal(job.description, "test-desc");
});
