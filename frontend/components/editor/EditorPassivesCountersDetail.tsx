import { Box, SimpleGrid, Title } from "@mantine/core";
import { PassiveSkillText } from "../text/SkillText";

type EditorPassivesCounterDetailProps = {};
export const EditorPassivesCounterDetail =
  ({}: EditorPassivesCounterDetailProps) => {
    return (
      <SimpleGrid cols={1}>
        <Title>Passives</Title>
        <Box
          sx={(t) => ({
            display: "flex",
            flexWrap: "wrap",
          })}
        >
          <SkillDetail />
          <SkillDetail />
        </Box>
        <Title>Counter</Title>
        <Box
          sx={(t) => ({
            display: "flex",
            flexWrap: "wrap",
          })}
        >
          <SkillDetail />
          <SkillDetail />
        </Box>
      </SimpleGrid>
    );
  };

const SkillDetail = () => {
  return (
    <PassiveSkillText
      jobHash="knig"
      skillHash="knig-p1"
      sx={(t) => ({
        minWidth: "50%",
      })}
    />
  );
};
