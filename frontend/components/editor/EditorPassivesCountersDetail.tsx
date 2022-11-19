import { Box, SimpleGrid } from "@mantine/core";
import { Character } from "builder";
import { useState } from "react";
import { CounterSkillInput, PassivesSkillInput } from "../inputs/SkillInput";
import { PassiveSkillText } from "../text/SkillText";
import { EditorHeading } from "./EditorHeading";

type EditorPassivesCounterDetailProps = {
  passives?: Character["passives"];
  counter?: Character["counter"];
};
export const EditorPassivesCounterDetail = ({
  passives,
  counter,
}: EditorPassivesCounterDetailProps) => {
  const [inputPassiveOpened, setInputPassivesOpened] = useState(false);
  const [inputCounterOpened, setInputCounterOpened] = useState(false);

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
                skillHash={p[1]}
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
            skillHash={counter?.[1]}
            sx={(t) => ({
              minWidth: "50%",
            })}
          />
        </Box>
      </SimpleGrid>
      <PassivesSkillInput
        value={passives}
        onChange={(value) => {}}
        opened={inputPassiveOpened}
        onClose={() => setInputPassivesOpened(false)}
      />
      <CounterSkillInput
        value={counter && [counter]}
        onChange={(value) => {}}
        opened={inputCounterOpened}
        onClose={() => setInputCounterOpened(false)}
      />
    </>
  );
};
