import { Box } from "@mantine/core";
import { Character } from "builder";
import { ReactNode } from "react";
import { useBoundingClientRect } from "../utils/hooks/useBoundingClientRect";
import { useDOMRef } from "../utils/hooks/useDOMRef";
import { useBuilder } from "./builder/Builder";
import { CharacterCard } from "./card/CharacterCard";
import { NewCard } from "./card/NewCard";
import { portraitWidth, mediaQuery } from "./style";

type CharacterListProps = {
  onFocusCharacter: (id: Character["id"]) => void;
};

export const CharacterList = ({ onFocusCharacter }: CharacterListProps) => {
  const { orderedCharacters, addNewCharacter } = useBuilder();

  const [list, queryList] = useDOMRef<HTMLElement>();
  const { width: listWidth = 0 } = useBoundingClientRect(list) || {};

  const itemBaseWidth = portraitWidth + 10;
  const capacity = Math.floor(listWidth / itemBaseWidth);
  const length = orderedCharacters?.length || 0;
  const present = (length + 1) % capacity;
  const missing = present ? capacity - present : present;

  return (
    <Box
      {...queryList()}
      component="ul"
      mx="md"
      my={0}
      sx={(t) => ({
        [mediaQuery.enoughHeight.media]: {
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
      <ListItem>
        <NewCard onClick={() => addNewCharacter?.({})} />
      </ListItem>

      {(orderedCharacters || []).map((c) => (
        <ListItem>
          <CharacterCard character={c} key={c.id} onFocus={onFocusCharacter} />
        </ListItem>
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

type ListItempProps = { children: ReactNode };
const ListItem = ({ children }: ListItempProps) => {
  return (
    <Box
      sx={(t) => ({
        [mediaQuery.enoughHeight.media]: {
          marginBottom: 15,
        },
        marginBottom: 0,
        marginLeft: 5,
        marginRight: 5,
      })}
    >
      {children}
    </Box>
  );
};
