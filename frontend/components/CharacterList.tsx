import { Box } from "@mantine/core";
import { useBoundingClientRect } from "../utils/hooks/useBoundingClientRect";
import { useDOMRef } from "../utils/hooks/useDOMRef";
import { useBuilder } from "./builder/Builder";
import { CharacterCard } from "./card/CharacterCard";
import { NewCard } from "./card/NewCard";
import { portraitWidth, mediaQuery } from "./style";

type CharacterListProps = {};

export const CharacterList = ({}: CharacterListProps) => {
  const { characters, addNewCharacter } = useBuilder();

  const [list, queryList] = useDOMRef<HTMLElement>();
  const { width: listWidth = 0 } = useBoundingClientRect(list) || {};

  const itemBaseWidth = portraitWidth + 20;
  const capacity = Math.floor(listWidth / itemBaseWidth);
  const length = characters?.length || 0;
  const present = (length + 1) % capacity;
  const missing = present ? capacity - present : present;

  return (
    <Box
      {...queryList()}
      component="ul"
      sx={(t) => ({
        [mediaQuery.enoughHeight]: {
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          paddingLeft: 0,
        },
        display: "flex",
        listStyle: "none",
        margin: 0,
        padding: 0,
        li: {
          flexGrow: 0,
          flexShrink: 0,
        },
        paddingLeft: 20,
      })}
    >
      <NewCard onClick={() => addNewCharacter?.({})} />

      {(characters || []).map((c) => (
        <CharacterCard character={c} />
      ))}

      {new Array(missing || 0).fill(1).map(() => (
        <Box
          sx={(t) => ({
            width: itemBaseWidth,
            visibility: "hidden",
          })}
        ></Box>
      ))}
    </Box>
  );
};
