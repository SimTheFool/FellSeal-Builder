import { createContext, useContext, useMemo } from "react";
import { newClient, AppErrors, Character, Job } from "builder";
import { useBuilderQuery } from "../../utils/store/useQuery";
import { keyBy } from "lodash";

const { queries, commands } = newClient();

type BuilderContext = {
  characters?: Character[];
  charactersError?: AppErrors<string>;
  jobsByName?: Record<Job["name"], Job>;
  jobsError?: AppErrors<string>;
};
const builderContext = createContext<BuilderContext>({});

export const BuilderProvider = ({ children }: { children: JSX.Element }) => {
  const [characters, charactersError] = useBuilderQuery(
    queries.getAllCharacters
  )();
  const [jobs, jobsError] = useBuilderQuery(queries.getAllJobs)();

  const jobsByName = useMemo(() => jobs && keyBy(jobs, (j) => j.name), [jobs]);

  return (
    <builderContext.Provider
      value={{
        characters,
        charactersError,
        jobsByName,
        jobsError,
      }}
    >
      {children}
    </builderContext.Provider>
  );
};

export const useBuilder = () => {
  const builder = useContext(builderContext);
  return builder;
};
