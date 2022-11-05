import { CSSObject, MantineTheme, Sx, Text, TextProps } from "@mantine/core";
import { Job, Skill } from "builder";
import { useTranslate } from "../translations/Translate";

type SkillText = {
  jobHash: Job["hash"];
  skillHash: Skill["hash"];
  sx?: (theme: MantineTheme) => CSSObject;
} & TextProps;

export const PassiveSkillText = ({
  jobHash,
  skillHash,
  sx,
  ...textProps
}: SkillText) => {
  const { t } = useTranslate();
  return (
    <Text
      size="sm"
      weight={900}
      color="dimmed"
      sx={(t) => ({
        ...sx?.(t),
        color: t.colors.dark[3],
      })}
      {...textProps}
    >
      {t(skillHash)}
    </Text>
  );
};
