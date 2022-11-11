import { Box, SimpleGrid, Title } from "@mantine/core";
import { PassiveSkillText } from "../text/SkillText";

type EditorJobDetailProps = {};
export const JobDetail = ({}: EditorJobDetailProps) => {
  return (
    <SimpleGrid cols={1}>
      <Title>Gadgetier</Title>
      <Box
        sx={(t) => ({
          display: "flex",
          flexWrap: "wrap",
        })}
      >
        <SkillDetail />
        <SkillDetail />
        <SkillDetail />
        <SkillDetail />
        <SkillDetail />
        <SkillDetail />
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
