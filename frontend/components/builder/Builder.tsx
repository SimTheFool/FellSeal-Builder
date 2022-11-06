import { createContext, useContext, useMemo } from "react";
import { newClient, AppErrors, Character, Job } from "builder";
import { useBuilderQuery } from "./useQuery";
import { keyBy } from "lodash";
import { UnvalidatedCharacter } from "builder/dist/domain/character/Character";
import { useBuilderCommand } from "./useCommand";

const { queries, commands } = newClient();

type BuilderContext = {
  addNewCharacter?: (unvalidatedCharacter: UnvalidatedCharacter) => void;
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

  const [addNewCharacter] = useBuilderCommand(commands.addNewCharacter);

  return (
    <builderContext.Provider
      value={{
        addNewCharacter,
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
