import test from "node:test";
import assert from "node:assert";
import { newAppError } from "@utils/Error";
import { map } from "./map";

test("should be a success", (t) => {
  const input = "test input";
  map(input)(
    () => assert.ok(true),
    () => assert.fail()
  );
});

test("should be an error", (t) => {
  const error = newAppError("test error");
  map([error])(
    () => assert.fail(),
    () => assert.ok(true)
  );
});
