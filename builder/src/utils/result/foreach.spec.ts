import test from "node:test";
import assert from "node:assert";
import { newAppError } from "@utils/Error";
import { getErrors } from "./get";
import { foreach } from "./foreach";

test("should map to x + 1 if no errors", (t) => {
  const inputs = [0, 2, 1, 3];
  assert.deepStrictEqual(
    foreach(inputs)((x) => (x || 0) + 1),
    [1, 3, 2, 4]
  );
});
