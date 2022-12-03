import { Center, SimpleGrid } from "@mantine/core";
import { useBuilder } from "../builder/Builder";
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
  const { skillsByHash } = useBuilder();

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
          skill={passives && skillsByHash?.[passives[0][1]]}
          sx={(t) => ({
            lineHeight: `${t.fontSizes.md}px`,
          })}
        />
      </Center>
      <div></div>
      <Center>
        <PassiveSkillText
          jobHash={passives?.[1][0]}
          skill={passives && skillsByHash?.[passives[1][1]]}
          sx={(t) => ({
            lineHeight: `${t.fontSizes.md}px`,
          })}
        />
      </Center>
      <PassiveSkillText
        jobHash={counter?.[0]}
        skill={counter && skillsByHash?.[counter[1]]}
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
