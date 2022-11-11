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

type EditorJobDetailProps = { jobHash?: Character["job"] };
export const JobDetail = ({ jobHash }: EditorJobDetailProps) => {
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
    </SimpleGrid>
  );
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
