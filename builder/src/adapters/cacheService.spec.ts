import { newCacheService } from "@adapters/cacheService";
import assert from "node:assert";
import test from "node:test";

test("should trigger cache query on registration", (t) => {
  const tracker = new assert.CallTracker();
  const query = () => {};
  const trackedQuery = tracker.calls(query, 1);

  const cacheService = newCacheService();
  cacheService.cache(["queryA1"], trackedQuery);

  tracker.verify();
});

test("should trigger cache query on invalidation if invalidation keys are in query keys", (t) => {
  const tracker = new assert.CallTracker();
  const query = () => {};
  const trackedQuery = tracker.calls(query, 3);

  const cacheService = newCacheService();
  cacheService.cache(["queryA1", "queryA2"], trackedQuery);
  cacheService.invalidate(["queryA1"]);
  cacheService.invalidate(["queryA2"]);

  tracker.verify();
});

test("should not trigger cache query if query has unsubscribed", (t) => {
  const tracker = new assert.CallTracker();
  const query = () => {};
  const trackedQuery = tracker.calls(query, 2);

  const cacheService = newCacheService();
  const unsubscribe = cacheService.cache(["queryA1", "queryA2"], trackedQuery);
  cacheService.invalidate(["queryA1"]);
  unsubscribe();
  cacheService.invalidate(["queryA2"]);

  tracker.verify();
});

test("should not trigger cache query if invalidation some invalidation keys are different", (t) => {
  const tracker = new assert.CallTracker();
  const query = () => {};
  const trackedQuery = tracker.calls(query, 2);

  const cacheService = newCacheService();
  cacheService.cache(["queryA1", "queryA2"], trackedQuery);
  cacheService.invalidate(["queryA1", "queryA2"]);
  cacheService.invalidate(["queryA1", "queryA3"]);

  tracker.verify();
});
