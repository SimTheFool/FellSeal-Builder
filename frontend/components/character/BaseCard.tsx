import { Box, Card, Center, SimpleGrid, Title } from "@mantine/core";
import Image from "next/image";
import { MainJobSkillText, SecondaryJobSkillText } from "../job/JobText";
import { PassiveSkillText } from "../job/SkillText";
import { portraitHeight, portraitWidth } from "../style";

type BaseCardProps = {
  name?: string;
  portrait?: string;
  job?: string;
  ability?: string;
  passives?: readonly [readonly [string, string], readonly [string, string]];
  counter?: readonly [string, string];
};

export const BaseCard = ({
  name,
  portrait,
  job,
  ability,
  passives,
  counter,
}: BaseCardProps) => {
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
                jobHash={passives?.[0][0]}
                skillHash={passives?.[0][1]}
                sx={(t) => ({
                  lineHeight: `${t.fontSizes.sm}px`,
                })}
              />
            </Center>
            <div></div>
            <Center>
              <PassiveSkillText
                jobHash={passives?.[1][0]}
                skillHash={passives?.[1][1]}
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
