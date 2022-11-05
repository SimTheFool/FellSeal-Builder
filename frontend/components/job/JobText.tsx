import {
  CSSObject,
  MantineStyleSystemProps,
  MantineTheme,
  Sx,
  Text,
  TextProps,
} from "@mantine/core";
import { Job } from "builder";
import { useBuilder } from "../builder/Builder";
import { useTranslate } from "../translations/Translate";

type JobText = {
  jobHash?: Job["hash"];
  sx?: (theme: MantineTheme) => CSSObject;
} & TextProps;

export const MainJobSkillText = ({ jobHash, sx, ...textProps }: JobText) => {
  return (
    <JobSkillText
      jobHash={jobHash}
      sx={sx}
      {...{
        weight: 900,
        ...textProps,
      }}
    />
  );
};

export const SecondaryJobSkillText = ({
  jobHash,
  sx,
  ...textProps
}: JobText) => {
  return <JobSkillText jobHash={jobHash} sx={sx} {...textProps} />;
};

const JobSkillText = ({ jobHash, sx, ...textProps }: JobText) => {
  const { t } = useTranslate();
  const { jobsByHash } = useBuilder();
  const job = jobHash ? jobsByHash?.[jobHash] : undefined;

  return (
    <Text
      size="md"
      sx={(t) => ({
        ...sx?.(t),
        visibility: job ? "visible" : "hidden",
      })}
      {...textProps}
    >
      {job ? t(job.title) : "hidden"}
    </Text>
  );
};
