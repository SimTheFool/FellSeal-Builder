import { ActionIcon, Box, Button, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Character } from "builder";
import { ReactNode, useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useBuilder } from "../builder/Builder";
import { ReadonlyJobDetail } from "../editor/EditorJobDetail";
import { Modal } from "../Modal";
import { mediaQuery } from "../style";
import { MainJobSkillText } from "../text/JobText";
import { useTranslate } from "../translations/Translate";

type CharacterJob = Character["job"];
type CharacterAbility = Character["ability"];

type JobsValue = {
  job?: CharacterJob;
  ability?: CharacterAbility;
};
type JobsInputProps = {
  opened: boolean;
  onClose: () => void;
  value: JobsValue;
  onChange: (value: JobsValue) => void;
};

export const JobInput = ({
  opened,
  onChange,
  onClose,
  value: initialValue,
}: JobsInputProps) => {
  const enoughHeight = useMediaQuery(mediaQuery.enoughHeight.value);

  const [value, setValue] = useState(initialValue);
  const { job, ability } = value;
  const changeJob = (newJob: CharacterJob) =>
    setValue({ job: newJob, ability: newJob === ability ? job : ability });
  const changeAbility = (newAbility: CharacterAbility) =>
    setValue({ job: newAbility === job ? ability : job, ability: newAbility });

  const { standardJobs } = useBuilder();
  const [inspectedhash, setInspectedHash] = useState(job);

  useEffect(() => {
    if (!job || inspectedhash) return;
    setInspectedHash(job);
  }, [job]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue, opened]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      onChange={() => {
        onChange(value);
        onClose();
      }}
      overflow={false}
      headerContent={<Header job={job} ability={ability} />}
    >
      <Box
        pt="md"
        sx={(t) => ({
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "nowrap",
          flexDirection: enoughHeight ? "column" : "unset",
          maxHeight: "100%",
          overflow: "hidden",
        })}
      >
        <Stack
          p="md"
          align="flex-start"
          sx={(t) => ({
            overflow: "auto",
            flexDirection: enoughHeight ? "row" : "column",
            flexWrap: enoughHeight ? "wrap" : "nowrap",
          })}
        >
          {standardJobs?.map(({ hash, title }) => (
            <JobOption
              id={hash}
              title={title}
              onClick={() => setInspectedHash(hash)}
              isJob={job === hash}
              isAbility={ability === hash}
            />
          ))}
        </Stack>
        <Box
          py="md"
          sx={(t) => ({
            display: "flex",
            flexDirection: "column",
            maxWidth: "300px",
            margin: "0 auto 0 auto",
          })}
        >
          <Box
            sx={(t) => ({
              display: "flex",
              justifyContent: "center",
            })}
            pb={enoughHeight ? 0 : "md"}
          >
            <ActionButton
              active={inspectedhash === job}
              onClick={() => inspectedhash && changeJob(inspectedhash)}
            >
              I
            </ActionButton>
            <ActionButton
              active={inspectedhash === ability}
              onClick={() => inspectedhash && changeAbility(inspectedhash)}
            >
              II
            </ActionButton>
          </Box>
          <JobDetail
            hash={inspectedhash}
            strokePassives={inspectedhash === ability}
          />
        </Box>
      </Box>
    </Modal>
  );
};

type JobOptionProps = {
  title: string;
  onClick?: (hash: string) => void;
  isJob?: boolean;
  isAbility?: boolean;
  id?: string;
};
export const JobOption = ({
  title,
  onClick,
  isJob,
  isAbility,
  id,
}: JobOptionProps) => {
  const { t } = useTranslate();
  const enoughHeight = useMediaQuery(mediaQuery.enoughHeight.value);
  return (
    <Button
      id={id}
      onClick={() => onClick?.(title)}
      p="sm"
      color="white"
      variant="outline"
      sx={(t) => ({
        width: enoughHeight ? "45%" : "100%",
        border: "1px solid white",
        borderColor: t.colors.white[2],
        overflow: "visible",
      })}
      styles={(t) => ({
        label: {
          overflow: "visible",
          width: "100%",
          display: "block",
        },
        inner: {
          width: "100%",
          display: "block",
        },
      })}
    >
      <Box
        sx={(t) => ({
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "space-between",
        })}
      >
        <Box>{t(title)}</Box>
        <MdOutlineKeyboardArrowRight />
      </Box>
    </Button>
  );
};

type JobDetailProps = {
  hash?: string;
  strokePassives?: boolean;
};
export const JobDetail = ({ hash, strokePassives }: JobDetailProps) => {
  return (
    <ReadonlyJobDetail
      jobHash={hash}
      p="md"
      sx={(t) => ({
        border: "1px solid white",
        borderColor: t.colors.white[2],
        borderRadius: t.radius.xs,
      })}
      strokePassives={strokePassives}
    />
  );
};

type ActionButtonProps = {
  onClick?: () => void;
  active?: boolean;
  children?: ReactNode;
};
export const ActionButton = ({
  active,
  onClick,
  children,
}: ActionButtonProps) => {
  return (
    <ActionIcon
      onClick={onClick}
      sx={(t) => ({
        color: t.colors.white[active ? 0 : 2],
        fontSize: t.fontSizes.lg,
      })}
    >
      {children}
    </ActionIcon>
  );
};

type HeaderProps = { job?: string; ability?: string };
export const Header = ({ job, ability }: HeaderProps) => {
  const { t } = useTranslate();
  return (
    <Button.Group
      sx={(t) => ({
        display: "flex",
        flexWrap: "nowrap",
      })}
    >
      <HeaderButton label={job} first />
      <HeaderButton label={ability} />
    </Button.Group>
  );
};

type HeaderButtonProps = { label?: string; first?: boolean };
export const HeaderButton = ({ label, first = false }: HeaderButtonProps) => {
  return (
    <Button
      variant="subtle"
      compact
      color="white"
      sx={(t) => ({
        position: "relative",
        color: t.colors.white[1],
      })}
      onClick={() => {
        const element = document.querySelector(`#${label}`);
        element?.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }}
    >
      <MainJobSkillText jobHash={label} />
      <Box
        sx={(t) => ({
          position: "absolute",
          left: "50%",
          bottom: "50%",
          transform: "translateY(61%) translateX(-50%)",
          fontSize: t.fontSizes.xl * 0.6,
          color: t.colors.white[2],
          zIndex: -1,
        })}
      >
        {first ? "I" : "II"}
      </Box>
    </Button>
  );
};
