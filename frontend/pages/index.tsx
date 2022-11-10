import { Drawer } from "@mantine/core";
import { Character } from "builder";
import type { NextPage } from "next";
import { useState } from "react";
import { CharacterList } from "../components/CharacterList";
import { Layout } from "../components/Layout";
import { Title } from "../components/Title";

const Home: NextPage = () => {
  const [focusedCharacter, setFocusedCharacter] = useState<string | null>(null);

  return (
    <>
      <CharacterEditor
        id={focusedCharacter}
        onClose={() => setFocusedCharacter(null)}
      />
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

type CharacterEditorProps = {
  id: Character["id"];
  onClose: () => void;
};
const CharacterEditor = ({ id, onClose }: CharacterEditorProps) => {
  return (
    <Drawer opened={id} onClose={onClose} withOverlay={false}>
      {id}
    </Drawer>
  );
};
