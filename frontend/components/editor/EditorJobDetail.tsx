import { Box, SimpleGrid, Title } from "@mantine/core";
import { Character } from "builder";
import { ReactNode } from "react";
import { useBuilder } from "../builder/Builder";
import {
  ActiveSkillText,
  CounterSkillText,
  PassiveSkillText,
} from "../text/SkillText";
import { useTranslate } from "../translations/Translate";
import { EditorHeading } from "./EditorHeading";

export const MainJobDetail = ({ jobHash }: JobDetailProps) => {
  return <JobDetail jobHash={jobHash} />;
};

export const SecondaryJobDetail = ({ jobHash }: JobDetailProps) => {
  return <JobDetail jobHash={jobHash} secondary />;
};

type SkillContainerProps = { children: ReactNode };
const SkillContainer = ({ children }: SkillContainerProps) => {
  return (
    <Box
      sx={(t) => ({
        display: "flex",
        flexWrap: "wrap",
      })}
    >
      {children}
    </Box>
  );
};

type JobDetailProps = { jobHash?: Character["job"]; secondary?: boolean };
const JobDetail = ({ jobHash, secondary = false }: JobDetailProps) => {
  const { t } = useTranslate();
  const { jobsByHash } = useBuilder();
  const job = jobHash && jobsByHash?.[jobHash];

  return (
    <SimpleGrid cols={1} verticalSpacing={0}>
      <EditorHeading>{t(job ? job.title : "No job selected")}</EditorHeading>

      <SkillContainer>
        {job &&
          job.actives.map((a) => (
            <ActiveSkillText
              skillHash={a.hash}
              sx={(t) => ({
                minWidth: "50%",
              })}
            />
          ))}
      </SkillContainer>

      {!secondary && (
        <>
          <SkillContainer>
            {job &&
              job.passives.map((p) => (
                <PassiveSkillText
                  skillHash={p.hash}
                  sx={(t) => ({
                    minWidth: "50%",
                  })}
                />
              ))}
          </SkillContainer>

          <SkillContainer>
            {job &&
              job.counters.map((c) => (
                <CounterSkillText
                  skillHash={c.hash}
                  sx={(t) => ({
                    minWidth: "50%",
                  })}
                />
              ))}
          </SkillContainer>
        </>
      )}
    </SimpleGrid>
  );
};
