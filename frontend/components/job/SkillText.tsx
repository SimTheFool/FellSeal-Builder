import { Text } from "@mantine/core";
import { Job, Skill } from "builder";
import { useTranslate } from "../translations/Translate";

type SkillText = {
  jobHash: Job["hash"];
  skillHash: Skill["id"];
};

export const PassiveSkillText = ({ jobHash, skillHash }: SkillText) => {
  const { t } = useTranslate();
  return (
    <Text size="sm" color="dimmed">
      {t(skillHash)}
    </Text>
  );
};
