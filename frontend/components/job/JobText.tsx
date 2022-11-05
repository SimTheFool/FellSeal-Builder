import {
  CSSObject,
  MantineStyleSystemProps,
  MantineTheme,
  Sx,
  Text,
} from "@mantine/core";
import { Job } from "builder";
import { useBuilder } from "../builder/Builder";
import { useTranslate } from "../translations/Translate";

type JobText = {
  jobHash: Job["hash"];
  sx?: (theme: MantineTheme) => CSSObject;
};

export const MainJobSkillText = ({ jobHash, sx }: JobText) => {
  return (
    <Text size="md" weight={900} sx={sx}>
      <JobSkillText jobHash={jobHash} />
    </Text>
  );
};

export const SecondaryJobSkillText = ({ jobHash, sx }: JobText) => {
  return (
    <Text size="md" sx={sx}>
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
