import test from "node:test";
import assert from "node:assert";
import { newAppError } from "@utils/Error";
import { hasError, isErrors, isOk } from "./is";

test("should return true if no errors", (t) => {
  assert.strictEqual(isOk("test string"), true);
});

test("should return false if errors", (t) => {
  const error = newAppError("test error");
  assert.strictEqual(isOk([error]), false);
});

test("should return true if errors", (t) => {
  const error = newAppError("test error");
  assert.strictEqual(isErrors([error]), true);
});

test("should return false if no errors", (t) => {
  assert.strictEqual(isErrors("test string"), false);
});

test("should return true if no error present", (t) => {
  const error1 = newAppError("test error 1");
  const error2 = newAppError("test error 2");
  assert.strictEqual(hasError([error1, error2])(error1), true);
});
