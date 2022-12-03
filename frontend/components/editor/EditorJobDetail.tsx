import {
  Box,
  CSSObject,
  MantineTheme,
  SimpleGrid,
  SimpleGridProps,
} from "@mantine/core";
import { Character } from "builder";
import { ReactNode, useMemo, useState } from "react";
import { useBuilder } from "../builder/Builder";
import { JobInput } from "../inputs/JobInput";
import { ActiveSkillText, PassiveSkillText } from "../text/SkillText";
import { useTranslate } from "../translations/Translate";
import { EditorHeading } from "./EditorHeading";

export const MainJobDetail = (props: Omit<BaseJobDetailProps, "secondary">) => {
  return <BaseJobDetail {...props} />;
};

export const SecondaryJobDetail = (
  props: Omit<BaseJobDetailProps, "secondary">
) => {
  return <BaseJobDetail {...props} secondary />;
};

export const ReadonlyJobDetail = ({
  jobHash,
  sx,
  ...props
}: Omit<BaseJobDetailProps, "abilityHash" | "secondary">) => {
  return <BaseJobDetail jobHash={jobHash} sx={sx} {...props} readonly />;
};

type BaseJobDetailProps = Omit<SimpleGridProps, "onChange"> & {
  jobHash?: Character["job"];
  abilityHash?: Character["ability"];
  secondary?: boolean;
  readonly?: boolean;
  strokePassives?: boolean;
  onChange?: (infos: Partial<Character>) => void;
  sx?: (theme: MantineTheme) => CSSObject;
};
const BaseJobDetail = ({
  jobHash,
  abilityHash,
  secondary = false,
  readonly = false,
  sx,
  strokePassives = false,
  onChange,
  ...props
}: BaseJobDetailProps) => {
  const { t } = useTranslate();
  const { jobsByHash, skillsByHash } = useBuilder();
  const job = secondary
    ? abilityHash && jobsByHash?.[abilityHash]
    : jobHash && jobsByHash?.[jobHash];

  const jobInputValue = useMemo(
    () => ({
      job: jobHash,
      ability: abilityHash,
    }),
    [jobHash, abilityHash]
  );

  const [inputOpened, setInputOpened] = useState(false);

  return (
    <>
      <SimpleGrid cols={1} verticalSpacing={0} sx={sx} {...props}>
        <EditorHeading onClick={() => setInputOpened(true)} readonly={readonly}>
          {t(job ? job.title : "No job selected")}
        </EditorHeading>

        <SkillContainer>
          {job &&
            job.actives.map((a) => (
              <ActiveSkillText
                skill={skillsByHash?.[a.hash]}
                sx={(t) => ({
                  minWidth: "50%",
                })}
              />
            ))}
        </SkillContainer>

        {!secondary && (
          <>
            <SkillContainer stroke={strokePassives}>
              {job &&
                job.passives.map((p) => (
                  <PassiveSkillText
                    skill={skillsByHash?.[p.hash]}
                    sx={(t) => ({
                      minWidth: "50%",
                    })}
                  />
                ))}
            </SkillContainer>
          </>
        )}
      </SimpleGrid>
      <JobInput
        value={jobInputValue}
        onChange={(value) => {
          onChange?.(value);
        }}
        opened={inputOpened}
        onClose={() => setInputOpened(false)}
      />
    </>
  );
};

type SkillContainerProps = { children: ReactNode; stroke?: boolean };
const SkillContainer = ({ children, stroke = false }: SkillContainerProps) => {
  return (
    <Box
      sx={(t) => ({
        display: "flex",
        flexWrap: "wrap",
        textDecorationLine: stroke ? "line-through" : "unset",
      })}
    >
      {children}
    </Box>
  );
};
