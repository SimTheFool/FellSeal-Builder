import { AppErrors } from "@utils/Error";
import { AppResult } from "@utils/result/Result";
import { CacheService, Unsubscriber } from "adapters/cacheService";

type Queriable<
  QueryParams extends any[],
  QueryResult,
  QueryError extends AppErrors<string>
> = (...params: QueryParams) => AppResult<QueryResult, QueryError>;

type QueryKeysSpecifier<QueryParams extends any[]> = (
  ...params: QueryParams
) => string[];

export type AppQuery<
  QueryParams extends any[],
  QueryResult,
  QueryError extends AppErrors<string>
> = (...params: QueryParams) => {
  on: (
    listenOk: (val: QueryResult) => void,
    listenErr: (err: QueryError) => void
  ) => Unsubscriber;
};

export const newQuery =
  <
    QueryParams extends any[],
    QueryResult,
    QueryError extends AppErrors<string>
  >(
    queriable: Queriable<QueryParams, QueryResult, QueryError>,
    getKeys: QueryKeysSpecifier<QueryParams>,
    cacheService: CacheService
  ): AppQuery<QueryParams, QueryResult, QueryError> =>
  (...params: QueryParams) => {
    const on = (
      listenOk: (val: QueryResult) => void,
      listenErr: (err: QueryError) => void
    ) => {
      const onChangeCallback = () =>
        queriable(...params).map(listenOk, listenErr);

      return cacheService.cache(getKeys(...params), onChangeCallback);
    };

    return { on };
  };
