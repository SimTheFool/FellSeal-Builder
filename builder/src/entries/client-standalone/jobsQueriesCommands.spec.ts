import { Job, isJob } from "@domain/job/Job.js";
import assert from "node:assert";
import test from "node:test";
import { newClient } from "./index.js";
//type Queries = ReturnType<typeof newClient>["queries"];

test("should get jobs", async (t) => {
  const { queries } = newClient();

  const jobsPromise = new Promise<Job[]>((res, rej) =>
    queries.getAllJobs().on(
      (jobs) => res(jobs),
      () => rej("could not get jobs")
    )
  );

  const jobs = await jobsPromise;
});
