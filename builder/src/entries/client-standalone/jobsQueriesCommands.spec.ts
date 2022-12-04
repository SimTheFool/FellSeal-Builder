import { Job } from "@domain/Job.js";
import test from "node:test";
import assert from "node:assert";
import { newClient } from "./index.js";

test("should get all badge jobs", async (t) => {
  const { queries } = newClient();

  const jobsPromise = new Promise<Job[]>((res, rej) =>
    queries.getJobs(["badge"]).on(
      (jobs) => res(jobs),
      () => rej("could not get jobs")
    )
  );

  const jobs = await jobsPromise;
  assert.equal(jobs.length, 6);
});

test("should get all story jobs", async (t) => {
  const { queries } = newClient();

  const jobsPromise = new Promise<Job[]>((res, rej) =>
    queries.getJobs(["story"]).on(
      (jobs) => res(jobs),
      () => rej("could not get jobs")
    )
  );

  const jobs = await jobsPromise;
  assert.equal(jobs.length, 6);
});

test("should get all characters jobs", async (t) => {
  const { queries } = newClient();

  const jobsPromise = new Promise<Job[]>((res, rej) =>
    queries.getJobs(["character"]).on(
      (jobs) => res(jobs),
      () => rej("could not get jobs")
    )
  );

  const jobs = await jobsPromise;
  assert.equal(jobs.length, 23);
});

test("should get all monster variant", async (t) => {
  const { queries } = newClient();

  const jobsPromise = new Promise<Job[]>((res, rej) =>
    queries.getJobs(["monsterVariant"]).on(
      (jobs) => res(jobs),
      () => rej("could not get jobs")
    )
  );

  const jobs = await jobsPromise;
  assert.equal(jobs.length, 25);
});

test("should get all monster", async (t) => {
  const { queries } = newClient();

  const jobsPromise = new Promise<Job[]>((res, rej) =>
    queries.getJobs(["monster"]).on(
      (jobs) => res(jobs),
      () => rej("could not get jobs")
    )
  );

  const jobs = await jobsPromise;
  assert.equal(jobs.length, 24); //@TODO should be 26 with dreakon and knifer
});

test("should get all bzil jobs", async (t) => {
  const { queries } = newClient();

  const jobsPromise = new Promise<Job[]>((res, rej) =>
    queries.getJobs(["bzil"]).on(
      (jobs) => res(jobs),
      () => rej("could not get jobs")
    )
  );

  const jobs = await jobsPromise;
  assert.equal(jobs.length, 20); //@TODO should be 22 with dreakon and knifer
});
