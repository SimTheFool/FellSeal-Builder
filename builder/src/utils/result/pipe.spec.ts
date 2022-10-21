import { newAppError } from "@utils/Error";
import assert from "node:assert";
import test from "node:test";
import { isErrors } from "./is";
import { pipe } from "./pipe";

test("should return 4 if piping x + 1 on 1", (t) => {
  const input = 1;
  assert.strictEqual(
    pipe(input)((x) => (x || 0) + 3),
    4
  );
});

test("should return error if piping on error", (t) => {
  const error = newAppError("test error");
  const result = pipe<number, number>([error])((x) => (x || 0) + 3);
  assert.strictEqual(isErrors(result), true);
});
