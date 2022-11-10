import assert from "node:assert";
import test from "node:test";

type Resolver<T> = (value: T | PromiseLike<T>) => void

type Cbk = (...params: unknown[]) => unknown;

function deferred<T>() {
  let resolve!: Resolver<T>;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
  });

  return {
    resolve,
    promise,
  } as const;
};

async function getCallbackWithInvokationPromise<T>(x: (res: Resolver<T>) => Cbk){
  const {promise,resolve} = deferred<T>();
  const cbk = x(resolve)
  return [cbk, promise] as const;
}



test("should return promise for first invokation", async (t) => {
  const [cbk, promise] = await getCallbackWithInvokationPromise(
    (res: Resolver<number>) => () => {
      res(12);
    }
  );

  cbk();
  const result = await promise;
  assert.equal(result, 12);
});
