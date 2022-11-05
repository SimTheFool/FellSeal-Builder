import { createContext, useContext, useMemo } from "react";
import { newClient, AppErrors, Character, Job } from "builder";
import { useBuilderQuery } from "../../utils/store/useQuery";
import { keyBy } from "lodash";

const { queries } = newClient();

type BuilderContext = {
  characters?: Character[];
  charactersError?: AppErrors<string>;
  jobsByHash?: Record<Job["hash"], Job>;
  jobsError?: AppErrors<string>;
};
const builderContext = createContext<BuilderContext>({});

export const BuilderProvider = ({ children }: { children: JSX.Element }) => {
  const [characters, charactersError] = useBuilderQuery(
    queries.getAllCharacters
  )();
  const [jobs, jobsError] = useBuilderQuery(queries.getAllJobs)();

  const jobsByHash = useMemo(() => jobs && keyBy(jobs, (j) => j.hash), [jobs]);

  return (
    <builderContext.Provider
      value={{
        characters,
        charactersError,
        jobsByHash,
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
