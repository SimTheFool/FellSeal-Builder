import { Text } from "@mantine/core";
import { Job, Skill } from "builder";
import { useMemo } from "react";
import { useBuilder } from "../builder/Builder";
import { useTranslate } from "../translations/Translate";

type SkillText = {
  jobHash: Job["name"];
  skillHash: Skill["id"];
};

export const SkillText = ({ jobHash, skillHash }: SkillText) => {
  const { t } = useTranslate();

  const { jobsByName } = useBuilder();
  const job = jobsByName?.[jobHash];
  const skill = useMemo(() => {
    if (!job) return;
    const { actives, passives, counters } = job;
    return [...actives, ...passives, ...counters].find(
      (skill) => skill.id === skillHash
    );
  }, [job]);

  if (!skill) return <>{`Skill ${skillHash} doesn't exist`}</>;

  if (skill.type === "passive")
    return (
      <Text size="sm" color="dimmed">
        {t(skill.id.toLowerCase())}
      </Text>
    );

  return <div>TODO</div>;
};
