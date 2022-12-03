import { Box, SimpleGrid } from "@mantine/core";
import { Character } from "builder";
import { useState } from "react";
import { useBuilder } from "../builder/Builder";
import { CounterSkillInput, PassivesSkillInput } from "../inputs/SkillInput";
import { PassiveSkillText } from "../text/SkillText";
import { EditorHeading } from "./EditorHeading";

type EditorPassivesCounterDetailProps = {
  passives?: Character["passives"];
  counter?: Character["counter"];
  onChange?: (infos: Partial<Character>) => void;
};
export const EditorPassivesCounterDetail = ({
  passives,
  counter,
  onChange,
}: EditorPassivesCounterDetailProps) => {
  const [inputPassiveOpened, setInputPassivesOpened] = useState(false);
  const [inputCounterOpened, setInputCounterOpened] = useState(false);
  const { skillsByHash } = useBuilder();
  return (
    <>
      <SimpleGrid cols={1} verticalSpacing={0}>
        <EditorHeading onClick={() => setInputPassivesOpened(true)}>
          Passives
        </EditorHeading>
        <Box
          sx={(t) => ({
            display: "flex",
            flexWrap: "wrap",
          })}
        >
          {passives &&
            passives.map((p) => (
              <PassiveSkillText
                jobHash={p[0]}
                skill={skillsByHash?.[p[1]]}
                sx={(t) => ({
                  minWidth: "50%",
                })}
              />
            ))}
        </Box>
        <EditorHeading onClick={() => setInputCounterOpened(true)}>
          Counter
        </EditorHeading>
        <Box
          sx={(t) => ({
            display: "flex",
            flexWrap: "wrap",
          })}
        >
          <PassiveSkillText
            jobHash={counter?.[0]}
            skill={counter && skillsByHash?.[counter[1]]}
            sx={(t) => ({
              minWidth: "50%",
            })}
          />
        </Box>
      </SimpleGrid>
      <PassivesSkillInput
        value={passives}
        onChange={(value) => {
          onChange?.({
            passives: value as Character["passives"],
          });
        }}
        opened={inputPassiveOpened}
        onClose={() => setInputPassivesOpened(false)}
      />
      <CounterSkillInput
        value={counter && [counter]}
        onChange={(value) => {
          onChange?.({
            counter: value[0],
          });
        }}
        opened={inputCounterOpened}
        onClose={() => setInputCounterOpened(false)}
      />
    </>
  );
};
