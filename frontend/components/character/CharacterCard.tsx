import {
  Box,
  Card,
  Center,
  SimpleGrid,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { Character } from "builder";
import Image from "next/image";
import portrait1 from "../../assets/portraits/3-Large.png";
import { portraitHeight, portraitWidth } from "../style";

type CharacterCardProps = {
  character: Character;
};

export const CharacterCard = ({ character }: CharacterCardProps) => {
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
          {character.name}
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