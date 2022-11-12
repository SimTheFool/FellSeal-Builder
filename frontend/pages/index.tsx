import { Drawer, DrawerProps } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Character } from "builder";
import type { NextPage } from "next";
import { useMemo, useState } from "react";
import { useBuilder } from "../components/builder/Builder";
import { CharacterList } from "../components/CharacterList";
import { Editor } from "../components/editor/Editor";
import { Layout } from "../components/Layout";
import { mediaQuery } from "../components/style";
import { Title } from "../components/Title";

const Home: NextPage = () => {
  const [focusedCharacter, setFocusedCharacter] = useState<string | null>(null);
  const { orderedCharacters } = useBuilder();
  const currentIndex = useMemo(
    () => orderedCharacters?.findIndex((c) => c.id === focusedCharacter),
    [orderedCharacters, focusedCharacter]
  );

  const previousIndex =
    currentIndex !== undefined && orderedCharacters
      ? mod(currentIndex - 1, orderedCharacters?.length)
      : null;
  const nextIndex =
    currentIndex !== undefined && orderedCharacters
      ? mod(currentIndex + 1, orderedCharacters?.length)
      : null;

  const onNext = () => {
    if (!orderedCharacters || nextIndex === null) return;
    setFocusedCharacter(orderedCharacters[nextIndex].id);
  };

  const onPrevious = () => {
    if (!orderedCharacters || previousIndex === null) return;
    setFocusedCharacter(orderedCharacters[previousIndex].id);
  };

  return (
    <>
      <Editor
        id={focusedCharacter}
        onClose={() => setFocusedCharacter(null)}
        onNext={onNext}
        onPrevious={onPrevious}
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

const mod = (n: number, m: number) => {
  return ((n % m) + m) % m;
};
