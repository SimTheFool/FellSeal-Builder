import { Job } from "@domain/Job.js";
import test from "node:test";
import assert from "node:assert";
import { newClient } from "./index.js";
//type Queries = ReturnType<typeof newClient>["queries"];

test("should get all 52 base game jobs", async (t) => {
  const { queries } = newClient();

  const jobsPromise = new Promise<Job[]>((res, rej) =>
    queries.getAllJobs().on(
      (jobs) => res(jobs),
      () => rej("could not get jobs")
    )
  );

  const jobs = await jobsPromise;
  assert.equal(jobs.filter((j) => j.type !== "monster").length, 52);
});
