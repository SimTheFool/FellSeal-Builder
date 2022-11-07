import { Center, SimpleGrid } from "@mantine/core";
import { MainJobSkillText, SecondaryJobSkillText } from "../job/JobText";

type BaseCardSubtitleProps = {
  job?: string;
  ability?: string;
};

export const BaseCardSubtitle = ({ job, ability }: BaseCardSubtitleProps) => {
  return (
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
  );
};
