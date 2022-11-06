import { CSSObject, MantineTheme, Sx, Text, TextProps } from "@mantine/core";
import { Job, Skill } from "builder";
import { PlaceholdingText } from "../../utils/components/PlaceholdingText";
import { useTranslate } from "../translations/Translate";

type SkillText = {
  jobHash?: Job["hash"];
  skillHash?: Skill["hash"];
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
    <PlaceholdingText
      size="sm"
      weight={900}
      color="dimmed"
      sx={(t) => ({
        ...sx?.(t),
        color: t.colors.dark[3],
        visibility: skillHash ? "inherit" : "hidden",
      })}
      {...textProps}
    >
      {skillHash && t(skillHash)}
    </PlaceholdingText>
  );
};
