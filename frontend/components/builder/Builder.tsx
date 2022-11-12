import { createContext, useContext, useMemo } from "react";
import {
  newClient,
  AppErrors,
  Character,
  Job,
  UnvalidatedCharacter,
} from "builder";
import { useBuilderQuery } from "./useQuery";
import { keyBy, sortBy } from "lodash";
import { useBuilderCommand } from "./useCommand";

const { queries, commands } = newClient();

type BuilderContext = {
  addNewCharacter?: (unvalidatedCharacter: UnvalidatedCharacter) => void;
  deleteCharacter?: (id: Character["id"]) => void;
  characters?: Character[];
  orderedCharacters?: Character[];
  charactersById?: Record<Character["id"], Character>;
  charactersError?: AppErrors<string>;
  jobsByHash?: Record<Job["hash"], Job>;
  jobsError?: AppErrors<string>;
};
const builderContext = createContext<BuilderContext>({});

export const BuilderProvider = ({ children }: { children: JSX.Element }) => {
  const [characters, charactersError] = useBuilderQuery(
    queries.getAllCharacters
  )();

  const charactersById = useMemo(
    () => characters && keyBy(characters, (c) => c.id as string),
    [characters]
  );

  const orderedCharacters = useMemo(
    () => characters && sortBy(characters, (c) => c.position),
    [characters]
  );

  const [jobs, jobsError] = useBuilderQuery(queries.getAllJobs)();

  const jobsByHash = useMemo(() => jobs && keyBy(jobs, (j) => j.hash), [jobs]);

  const [addNewCharacter] = useBuilderCommand(commands.addNewCharacter);

  const [deleteCharacter] = useBuilderCommand(commands.deleteCharacter);

  return (
    <builderContext.Provider
      value={{
        addNewCharacter,
        deleteCharacter,
        characters,
        orderedCharacters,
        charactersById,
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
