import test from "node:test";
import assert from "node:assert";
import { newAppError } from "@utils/Error";
import { map } from "./map";

test("should return true if no errors", (t) => {
  const input = "test input";
  assert.strictEqual(
    map(input)(
      () => true,
      () => false
    ),
    true
  );
});

test("should return 2 if errors", (t) => {
  const error = newAppError("test error");
  assert.strictEqual(
    map([error])(
      () => 1,
      () => 2
    ),
    2
  );
});
