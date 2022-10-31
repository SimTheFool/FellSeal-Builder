import { AppQuery, AppErrors } from "builder";
import { useEffect, useState } from "react";

export const useBuilderQuery =
  <
    QueryParams extends any[],
    QueryResult,
    QueryErrors extends AppErrors<string>
  >(
    appQuery: AppQuery<QueryParams, QueryResult, QueryErrors>
  ) =>
  (...params: QueryParams) => {
    const [result, setResult] = useState<QueryResult>();
    const [errors, setErrors] = useState<QueryErrors>();

    useEffect(() => {
      const unsubscribe = appQuery(...params).on(
        (res) => setResult(res),
        (err) => setErrors(err)
      );
      return unsubscribe;
    }, [...params]);

    return [result, errors] as const;
  };
