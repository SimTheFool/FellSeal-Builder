import { Box, Center } from "@mantine/core";
import { Character } from "builder";
import { useEffect, useMemo, useState } from "react";
import { useBuilder } from "../builder/Builder";
import { Modal } from "../Modal";
import { MainJobSkillText } from "../text/JobText";
import { PassiveSkillText } from "../text/SkillText";

type SkillValue = Character["passives"];
type SkillItem = {
  jobHash: string;
  hash: string;
};
type SkillInputProps = {
  opened: boolean;
  onClose: () => void;
  value?: SkillValue;
  onChange: (value: SkillValue) => void;
  options?: SkillItem[];
};

export const PassivesSkillInput = (props: Omit<SkillInputProps, "options">) => {
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

  return <SkillInput {...props} options={passivesOptions} />;
};

export const CounterSkillInput = (props: Omit<SkillInputProps, "options">) => {
  return <SkillInput {...props} options={[]} />;
};

const SkillInput = ({
  opened,
  onChange,
  onClose,
  value: initialValue,
  options,
}: SkillInputProps) => {
  const [passives, setPassives] = useState<readonly Character["passives"][0][]>(
    initialValue || []
  );
  const passivesHash = useMemo(() => passives.map((p) => p[1]), [passives]);

  const toggleSkill = (skill: SkillItem) => {
    const skillIndex = passives.findIndex((s) => s[1] === skill.hash);
    if (skillIndex < 0) {
      setPassives([...passives, [skill.jobHash, skill.hash]]);
      return;
    }

    const newPassives = [...passives];
    newPassives.splice(skillIndex, 1);
    setPassives(newPassives);
  };

  useEffect(() => {
    setPassives(initialValue || []);
  }, [initialValue, opened]);

  return (
    <Modal
      disabled={passives.length !== 2}
      opened={opened}
      onClose={onClose}
      onChange={() => {
        onChange(passives as any);
        onClose();
      }}
      overflow={false}
      headerContent={
        <>
          Select two passives
          {passives.length < 2
            ? ` - missing ${2 - passives.length}`
            : passives.length == 2
            ? ""
            : ` - too many selected (${passives.length})`}
        </>
      }
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
            selected={passivesHash.includes(o.hash)}
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
  return (
    <Box
      component="li"
      py="xs"
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
            lineHeight: 0.3,
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
      <Box
        sx={(t) => ({
          fontSize: t.fontSizes.sm,
        })}
      >
        AAAAA dfgdfg fghfghfgh gyjgthj ghj
      </Box>
    </Box>
  );
};
