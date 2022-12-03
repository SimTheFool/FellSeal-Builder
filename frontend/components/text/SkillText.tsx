import { CSSObject, MantineTheme, Sx, Text, TextProps } from "@mantine/core";
import { Job, Skill } from "builder";
import { useMemo } from "react";
import { PlaceholdingText } from "../../utils/components/PlaceholdingText";
import { useBuilder } from "../builder/Builder";
import { useTranslate } from "../translations/Translate";

type SkillText = {
  jobHash?: Job["hash"];
  skillHash?: Skill["hash"];
  sx?: (theme: MantineTheme) => CSSObject;
} & TextProps;

export const PassiveSkillText = ({ ...props }: SkillText) => {
  return <SkillText {...props} color="dark.2" />;
};

export const CounterSkillText = ({ ...props }: SkillText) => {
  return <SkillText {...props} color="dark.2" />;
};

export const ActiveSkillText = ({ ...props }: SkillText) => {
  return <SkillText {...props} color="white.0" />;
};

const SkillText = ({ skillHash, sx, ...textProps }: SkillText) => {
  const { t } = useTranslate();
  const { skillsByHash } = useBuilder();
  const finalSkill = useMemo(() => {
    const skill = skillHash ? skillsByHash?.[skillHash] : undefined;
    const finalSkill = skill?.likeHash
      ? skillsByHash?.[skill?.likeHash]
      : skill;
    return finalSkill;
  }, [skillsByHash, skillHash]);

  return (
    <PlaceholdingText
      size="sm"
      weight={900}
      sx={(t) => ({
        ...sx?.(t),
        visibility: skillHash ? "inherit" : "hidden",
      })}
      {...textProps}
    >
      {finalSkill && t(finalSkill.hash)}
    </PlaceholdingText>
  );
};
