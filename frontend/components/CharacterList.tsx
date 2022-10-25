import { Box, Card, Center, SimpleGrid, Space, Text } from "@mantine/core";
import Image from "next/image";
import portrait1 from "../assets/portraits/3-Large.png";
import { mediaQuery, portraitHeight, portraitWidth } from "../components/style";
import { Title } from "@mantine/core";
import { useDOMRef } from "../utils/hooks/useDOMRef";
import { useBoundingClientRect } from "../utils/hooks/useBoundingClientRect";

type CharacterListProps = {};

export const CharacterList = ({}: CharacterListProps) => {
  const [list, queryList] = useDOMRef<HTMLElement>();
  const { width: listWidth = 0 } = useBoundingClientRect(list) || {};

  const itemBaseWidth = portraitWidth + 20;
  const capacity = Math.floor(listWidth / itemBaseWidth);
  const length = 7;
  const present = length % capacity;
  const missing = present ? capacity - present : present;

  console.log(missing, new Array(missing || 0));

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
      <Portrait />
      <Portrait />
      <Portrait />
      <Portrait />
      <Portrait />
      <Portrait />
      <Portrait />
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

const Portrait = () => {
  return (
    <Card
      radius="md"
      shadow="md"
      component="li"
      sx={(t) => ({
        height: portraitHeight,
        margin: 10,
      })}
    >
      <Card.Section>
        <Image src={portrait1} width={portraitWidth} height={portraitHeight} />
      </Card.Section>
      <Box
        sx={(t) => ({
          position: "absolute",
          bottom: 0,
          width: "100%",
          left: 0,
        })}
      >
        <Title order={3} align={"center"} size="h3">
          Kyrie
        </Title>
        <SimpleGrid
          cols={1}
          spacing="lg"
          verticalSpacing="xs"
          p="xs"
          sx={(t) => ({
            backgroundColor: t.colors.dark,
          })}
        >
          <Center>
            <Text size="md" weight={900}>
              Mercenary
            </Text>
            <Space w="xs" />
            <Text size="md">Gadgetier</Text>
          </Center>
          <Center>
            <Text size="sm" color="dimmed">
              Attack expert
            </Text>
            <Space w="xs" />
            <Text size="sm" color="dimmed">
              Blessed one
            </Text>
          </Center>
        </SimpleGrid>
      </Box>
    </Card>
  );
};
