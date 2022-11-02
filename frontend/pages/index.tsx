import type { NextPage } from "next";
import { BuilderProvider } from "../components/builder/Builder";
import { CharacterList } from "../components/character/CharacterList";
import { Layout } from "../components/Layout";
import { Title } from "../components/Title";

const Home: NextPage = () => {
  return (
    <BuilderProvider>
      <Layout
        title={<Title />}
        placeholder={<Title />}
        characterList={<CharacterList />}
      />
    </BuilderProvider>
  );
};

export default Home;
