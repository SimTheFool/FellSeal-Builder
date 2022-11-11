import { Center, SimpleGrid } from "@mantine/core";
import { PassiveSkillText } from "../text/SkillText";

type BaseCardFooterProps = {
  passives?: readonly [readonly [string, string], readonly [string, string]];
  counter?: readonly [string, string];
  display: boolean;
};
export const BaseCardFooter = ({
  passives,
  counter,
  display,
}: BaseCardFooterProps) => {
  return (
    <SimpleGrid
      cols={2}
      spacing={0}
      sx={(t) => ({
        opacity: display ? 1 : 0,
        pointerEvents: display ? "auto" : "none",
        "transition-property": "opacity",
        "transition-duration": "0.5s",
      })}
    >
      <Center>
        <PassiveSkillText
          jobHash={passives?.[0][0]}
          skillHash={passives?.[0][1]}
          sx={(t) => ({
            lineHeight: `${t.fontSizes.md}px`,
          })}
        />
      </Center>
      <div></div>
      <Center>
        <PassiveSkillText
          jobHash={passives?.[1][0]}
          skillHash={passives?.[1][1]}
          sx={(t) => ({
            lineHeight: `${t.fontSizes.md}px`,
          })}
        />
      </Center>
      <PassiveSkillText
        jobHash={counter?.[0]}
        skillHash={counter?.[1]}
        lineClamp={1}
        px="md"
        sx={(t) => ({
          textAlign: "right",
          lineHeight: `${t.fontSizes.md}px`,
        })}
      />
    </SimpleGrid>
  );
};
