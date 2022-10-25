import { Box } from "@mantine/core";
import Image from "next/image";
import portrait1 from "../assets/portraits/3-Large.png";
import { mediaQuery, portraitHeight, portraitWidth } from "../components/style";

type CharacterListProps = {};

export const CharacterList = ({}: CharacterListProps) => {
  return (
    <Box
      component="ul"
      sx={(t) => ({
        [mediaQuery.enoughHeight]: {
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          ":after": {
            content: "'aa'",
            flexBasis: "228px",
          },
        },
        display: "flex",
        listStyle: "none",
        margin: 0,
        padding: 0,
        li: {
          flexGrow: 0,
          flexShrink: 0,
        },
      })}
    >
      <Portrait />
      <Portrait />
      <Portrait />
      <Portrait />
      <Portrait />
      <Portrait />
      <Portrait />
      <Portrait />
      <Portrait />
      <Portrait />
      <Portrait />
      <Portrait />
      <Portrait />
      <Portrait />
      <Portrait />
    </Box>
  );
};

const Portrait = () => {
  return (
    <Box
      component="li"
      sx={(t) => ({
        height: portraitHeight,
        margin: 10,
      })}
    >
      <Image src={portrait1} width={portraitWidth} height={portraitHeight} />
    </Box>
  );
};
