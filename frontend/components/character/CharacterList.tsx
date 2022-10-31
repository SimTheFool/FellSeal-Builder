import { Box } from "@mantine/core";
import { Character } from "builder";
import { useBoundingClientRect } from "../../utils/hooks/useBoundingClientRect";
import { useDOMRef } from "../../utils/hooks/useDOMRef";
import { mediaQuery, portraitWidth } from "../style";
import { CharacterCard } from "./CharacterCard";

type CharacterListProps = {
  characters: Character[];
};

export const CharacterList = ({ characters }: CharacterListProps) => {
  const [list, queryList] = useDOMRef<HTMLElement>();
  const { width: listWidth = 0 } = useBoundingClientRect(list) || {};

  const itemBaseWidth = portraitWidth + 20;
  const capacity = Math.floor(listWidth / itemBaseWidth);
  const length = characters.length;
  const present = length % capacity;
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
      {characters.map((c) => (
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
