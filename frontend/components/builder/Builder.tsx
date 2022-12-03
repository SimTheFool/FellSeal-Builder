import { createContext, useContext, useMemo } from "react";
import {
  newClient,
  AppErrors,
  Character,
  Job,
  UnvalidatedCharacter,
  Skill,
} from "builder";
import { useBuilderQuery } from "./useQuery";
import { keyBy, sortBy } from "lodash";
import { useBuilderCommand } from "./useCommand";

const { queries, commands } = newClient();

type BuilderContext = {
  addNewCharacter?: (unvalidatedCharacter: UnvalidatedCharacter) => void;
  deleteCharacter?: (id: Character["id"]) => void;
  patchCharacter?: (id: Character["id"], infos: Partial<Character>) => void;
  characters?: Character[];
  orderedCharacters?: Character[];
  charactersById?: Record<Character["id"], Character>;
  charactersError?: AppErrors<string>;
  jobsByHash?: Record<Job["hash"], Job>;
  skillsByHash?: Record<Skill["hash"], Skill>;
  jobs?: Job[];
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

  const [skills, skillsError] = useBuilderQuery(queries.getAllSkills)();

  console.log(skills?.find((s) => s.hash === "lord-p1"));

  const skillsByHash = useMemo(
    () => skills && keyBy(skills, (s) => s.hash),
    [skills]
  );

  const [addNewCharacter] = useBuilderCommand(commands.addNewCharacter);

  const [deleteCharacter] = useBuilderCommand(commands.deleteCharacter);

  const [patchCharacter] = useBuilderCommand(commands.patchCharacter);

  return (
    <builderContext.Provider
      value={{
        addNewCharacter,
        deleteCharacter,
        patchCharacter,
        characters,
        orderedCharacters,
        charactersById,
        charactersError,
        jobsByHash,
        jobs,
        jobsError,
        skillsByHash,
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
