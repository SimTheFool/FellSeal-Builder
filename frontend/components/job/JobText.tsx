import { Text } from "@mantine/core";
import { Job } from "builder";
import { useBuilder } from "../builder/Builder";
import { useTranslate } from "../translations/Translate";

type JobText = {
  jobHash: Job["hash"];
};

export const MainJobSkillText = ({ jobHash }: JobText) => {
  return (
    <Text size="md" weight={900}>
      <JobSkillText jobHash={jobHash} />
    </Text>
  );
};

export const SecondaryJobSkillText = ({ jobHash }: JobText) => {
  return (
    <Text size="md">
      <JobSkillText jobHash={jobHash} />
    </Text>
  );
};

const JobSkillText = ({ jobHash }: JobText) => {
  const { t } = useTranslate();
  const { jobsByHash } = useBuilder();
  const job = jobsByHash?.[jobHash];

  if (!job) return <></>;

  return <>{t(job.title)}</>;
};
