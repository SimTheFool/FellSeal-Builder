import { Drawer, DrawerProps } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Character } from "builder";
import type { NextPage } from "next";
import { useState } from "react";
import { useBuilder } from "../components/builder/Builder";
import { CharacterList } from "../components/CharacterList";
import { Editor } from "../components/editor/Editor";
import { Layout } from "../components/Layout";
import { mediaQuery } from "../components/style";
import { Title } from "../components/Title";

const Home: NextPage = () => {
  const [focusedCharacter, setFocusedCharacter] = useState<string | null>(null);

  return (
    <>
      <Editor id={focusedCharacter} onClose={() => setFocusedCharacter(null)} />
      <Layout
        title={<Title />}
        placeholder={<Title />}
        characterList={
          <CharacterList onFocusCharacter={(id) => setFocusedCharacter(id)} />
        }
      />
    </>
  );
};

export default Home;
