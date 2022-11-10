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

  const itemBaseWidth = portraitWidth + 10;
  const capacity = Math.floor(listWidth / itemBaseWidth);
  const length = characters?.length || 0;
  const present = (length + 1) % capacity;
  const missing = present ? capacity - present : present;

  return (
    <Box
      {...queryList()}
      component="ul"
      mx="md"
      sx={(t) => ({
        [mediaQuery.enoughHeight]: {
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          paddingLeft: 0,
        },
        display: "flex",
        listStyle: "none",
        padding: 0,
        li: {
          flexGrow: 0,
          flexShrink: 0,
        },
        paddingLeft: 20,
      })}
    >
      <Box
        sx={(t) => ({
          marginBottom: 15,
          marginLeft: 5,
          marginRight: 5,
        })}
      >
        <NewCard onClick={() => addNewCharacter?.({})} />
      </Box>

      {(characters || []).map((c) => (
        <Box
          sx={(t) => ({
            marginBottom: 15,
            marginLeft: 5,
            marginRight: 5,
          })}
        >
          <CharacterCard character={c} key={c.id} />
        </Box>
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
