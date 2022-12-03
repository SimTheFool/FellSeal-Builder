import { Box, Center, Divider } from "@mantine/core";
import { Character, CharacterSkill } from "builder";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useBuilder } from "../builder/Builder";
import { Modal } from "../Modal";
import { MainJobSkillText } from "../text/JobText";
import { PassiveSkillText } from "../text/SkillText";
import { useTranslate } from "../translations/Translate";

type SkillValue = readonly CharacterSkill[];
type SkillItem = {
  jobHash: string;
  hash: string;
  description: string;
};
type SkillInputProps = {
  opened: boolean;
  onClose: () => void;
  value?: SkillValue;
  onChange: (value: SkillValue) => void;
  options?: SkillItem[];
  maxOptions: number;
  maxOptionMessage: (max: number, current: number) => ReactNode;
};

export const PassivesSkillInput = (
  props: Omit<SkillInputProps, "options" | "maxOptions" | "maxOptionMessage">
) => {
  const { jobs } = useBuilder();
  const passivesOptions = useMemo(
    () =>
      jobs &&
      Object.values(jobs).flatMap(({ passives, ...job }) =>
        passives.map((passive) => ({
          ...passive,
          jobHash: job.hash,
        }))
      ),
    [jobs]
  );

  const maxOptionsMessage = (max: number, current: number): ReactNode => (
    <>
      Select two passives
      {current < max
        ? ` - missing ${max - current}`
        : current == max
        ? ""
        : ` - too many selected (${current})`}
    </>
  );

  return (
    <SkillInput
      {...props}
      options={passivesOptions}
      maxOptions={2}
      maxOptionMessage={maxOptionsMessage}
    />
  );
};

export const CounterSkillInput = (
  props: Omit<SkillInputProps, "options" | "maxOptions" | "maxOptionMessage">
) => {
  const { jobs } = useBuilder();
  const counterOptions = useMemo(
    () =>
      jobs &&
      Object.values(jobs).flatMap(({ counters, ...job }) =>
        counters.map((counter) => ({
          ...counter,
          jobHash: job.hash,
        }))
      ),
    [jobs]
  );

  const maxOptionsMessage = useCallback(
    (max: number, current: number): ReactNode => (
      <>
        Select one counter
        {current < max
          ? ` - missing ${max - current}`
          : current == max
          ? ""
          : ` - too many selected (${current})`}
      </>
    ),
    []
  );
  return (
    <SkillInput
      {...props}
      options={counterOptions}
      maxOptions={1}
      maxOptionMessage={maxOptionsMessage}
    />
  );
};

const SkillInput = ({
  opened,
  onChange,
  onClose,
  value: initialValue,
  options,
  maxOptions,
  maxOptionMessage,
}: SkillInputProps) => {
  const [skills, setSkills] = useState<readonly CharacterSkill[]>(
    initialValue || []
  );
  const skillsHash = useMemo(() => skills.map((p) => p[1]), [skills]);

  const toggleSkill = (skill: SkillItem) => {
    const skillIndex = skills.findIndex((s) => s[1] === skill.hash);
    if (skillIndex < 0) {
      setSkills([...skills, [skill.jobHash, skill.hash]]);
      return;
    }

    const newSkills = [...skills];
    newSkills.splice(skillIndex, 1);
    setSkills(newSkills);
  };

  useEffect(() => {
    setSkills(initialValue || []);
  }, [initialValue, opened]);

  return (
    <Modal
      disabled={skills.length !== maxOptions}
      opened={opened}
      onClose={onClose}
      onChange={() => {
        onChange(skills as any);
        onClose();
      }}
      overflow={false}
      headerContent={maxOptionMessage(maxOptions, skills.length)}
    >
      <Box
        pt="md"
        component="ul"
        sx={(t) => ({
          padding: 0,
          margin: 0,
          maxHeight: "100%",
          overflow: "auto",
          listStyle: "none",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        })}
      >
        {options?.map((o) => (
          <SkillDetail
            skill={o}
            key={o.hash}
            selected={skillsHash.includes(o.hash)}
            onSelected={toggleSkill}
          />
        ))}
      </Box>
    </Modal>
  );
};

type SkillDetailProps = {
  skill: SkillItem;
  selected?: boolean;
  onSelected?: (skill: SkillItem) => void;
};
const SkillDetail = ({
  skill,
  selected = false,
  onSelected,
}: SkillDetailProps) => {
  const { t } = useTranslate();
  const { skillsByHash } = useBuilder();
  const finalSkill = useMemo(() => {
    const originSkill = skill.hash ? skillsByHash?.[skill.hash] : undefined;
    const finalSkill = originSkill?.likeHash
      ? skillsByHash?.[originSkill?.likeHash]
      : skill;
    return finalSkill;
  }, [skillsByHash, skill]);
  return (
    <Box
      component="li"
      py="md"
      px="sm"
      my="xs"
      sx={(t) => ({
        width: "45%",
        border: "1px solid white",
        borderColor: selected ? t.colors.white[0] : t.colors.white[3],
        borderRadius: t.radius.sm,
        boxSizing: "border-box",
      })}
      onClick={() => onSelected?.(skill)}
    >
      <Center>
        <PassiveSkillText
          skillHash={skill.hash}
          size="md"
          sx={(t) => ({
            display: "inline",
            lineHeight: 0.7,
          })}
        />
      </Center>
      <Center>
        <MainJobSkillText
          jobHash={skill.jobHash}
          size="sm"
          sx={(t) => ({
            display: "inline",
          })}
        />
      </Center>
      <Divider my="sm" />
      <Box
        sx={(t) => ({
          fontSize: t.fontSizes.sm,
          fontFamily: "Libre Baskerville",
          textAlign: "center",
        })}
      >
        {finalSkill && t(finalSkill?.description)}
      </Box>
    </Box>
  );
};
