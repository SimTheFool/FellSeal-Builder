import type { NextPage } from "next";
import { CharacterList } from "../components/CharacterList";
import { Layout } from "../components/Layout";
import { Title } from "../components/Title";

/* backgroundImage: 'url("./background.png")' */

const Home: NextPage = () => {
  return (
    <Layout
      title={<Title />}
      placeholder={<Title />}
      characterList={<CharacterList />}
    />
  );
};

export default Home;
