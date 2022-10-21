import { newAppError } from "@utils/Error";
import assert from "node:assert";
import test from "node:test";
import { ACCESS_ERRORS, getErrors, getOk } from "./get";

test("should return result if no errors", (t) => {
  const testString = "test string";
  assert.strictEqual(getOk(testString), testString);
});

test("should throw error when trying to get result if errors", (t) => {
  const error = newAppError("test error");
  assert.throws(() => getOk([error]), ACCESS_ERRORS.NO_OK);
});

test("should return errors if errors", (t) => {
  const error = newAppError("test error");
  assert.strictEqual(getErrors([error])[0], error);
});

test("should throw error when trying to get errors if no errors", (t) => {
  const testString = "test string";
  assert.throws(() => getErrors(testString), ACCESS_ERRORS.NO_ERROR);
});
