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
import { MainJobSkillText, SecondaryJobSkillText } from "../job/JobText";
import { PassiveSkillText } from "../job/SkillText";
import { portraitHeight, portraitWidth } from "../style";

type CharacterCardProps = {
  character: Character;
};

export const CharacterCard = ({
  character: {
    name,
    job,
    ability,
    passives: [firstPassive, secondPassive],
  },
}: CharacterCardProps) => {
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
          {name}
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
            <MainJobSkillText jobHash={job} />
            <Space w="xs" />
            <SecondaryJobSkillText jobHash={ability} />
          </Center>
          <Center>
            <PassiveSkillText
              jobHash={firstPassive[0]}
              skillHash={firstPassive[1]}
            />
            <Space w="xs" />
            <PassiveSkillText
              jobHash={secondPassive[0]}
              skillHash={secondPassive[1]}
            />
          </Center>
        </SimpleGrid>
      </Box>
    </Card>
  );
};
