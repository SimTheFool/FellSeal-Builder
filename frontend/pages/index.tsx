import type { NextPage } from "next";
import { useEffect } from "react";
import { CharacterList } from "../components/character/CharacterList";
import { Layout } from "../components/Layout";
import { Title } from "../components/Title";
import { commands, queries } from "../utils/store/builder";
import { useBuilderQuery } from "../utils/store/useQuery";

const Home: NextPage = () => {
  const [characters] = useBuilderQuery(queries.getAllCharacters)();

  return (
    <Layout
      title={<Title />}
      placeholder={<Title />}
      characterList={<CharacterList characters={characters || []} />}
    />
  );
};

export default Home;
