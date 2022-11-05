import { Box, Card, Center, SimpleGrid, Title } from "@mantine/core";
import { Character } from "builder";
import Image from "next/image";
import { MainJobSkillText, SecondaryJobSkillText } from "../job/JobText";
import { PassiveSkillText } from "../job/SkillText";
import { portraitHeight, portraitWidth } from "../style";

type CharacterCardProps = {
  character?: Character;
};

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const {
    name,
    portrait,
    job,
    ability,
    passives: [firstPassive, secondPassive] = [],
    counter,
  } = character || {};

  return (
    <Card
      radius="md"
      shadow="md"
      component="li"
      sx={(t) => ({
        height: portraitHeight,
        margin: 10,
        color: t.colors.white[0],
      })}
    >
      <Card.Section>
        <Image
          src={`/portraits/${portrait ?? "default.png"}`}
          width={portraitWidth}
          height={portraitHeight}
        />
      </Card.Section>
      <Box
        sx={(t) => ({
          position: "absolute",
          bottom: 0,
          width: "100%",
          left: 0,
        })}
      >
        <SimpleGrid
          cols={1}
          spacing="lg"
          verticalSpacing="md"
          p="xs"
          sx={(t) => ({
            background: `linear-gradient(0deg, rgba(0,0,0,1) 10%, rgba(0,0,0,0.4906337535014006) 80%, rgba(255,0,0,0) 100%)`,
          })}
        >
          <Title
            order={3}
            align={"center"}
            size="h3"
            sx={(t) => ({
              visibility: name ? "visible" : "hidden",
            })}
          >
            {name ?? "hidden"}
          </Title>
          <SimpleGrid cols={1} spacing={0}>
            <Center>
              <MainJobSkillText
                jobHash={job}
                sx={(t) => ({
                  lineHeight: `${t.fontSizes.sm}px`,
                })}
              />
            </Center>
            <Center>
              <SecondaryJobSkillText
                jobHash={ability}
                sx={(t) => ({
                  lineHeight: `${t.fontSizes.sm}px`,
                })}
              />
            </Center>
          </SimpleGrid>

          <SimpleGrid cols={2} spacing={0}>
            <Center>
              <PassiveSkillText
                jobHash={firstPassive?.[0]}
                skillHash={firstPassive?.[1]}
                sx={(t) => ({
                  lineHeight: `${t.fontSizes.sm}px`,
                })}
              />
            </Center>
            <div></div>
            <Center>
              <PassiveSkillText
                jobHash={secondPassive?.[0]}
                skillHash={secondPassive?.[1]}
                sx={(t) => ({
                  lineHeight: `${t.fontSizes.sm}px`,
                })}
              />
            </Center>
            <PassiveSkillText
              jobHash={counter?.[0]}
              skillHash={counter?.[1]}
              lineClamp={1}
              px="sm"
              sx={(t) => ({
                textAlign: "right",
                lineHeight: `${t.fontSizes.sm}px`,
              })}
            />
          </SimpleGrid>
        </SimpleGrid>
      </Box>
    </Card>
  );
};
