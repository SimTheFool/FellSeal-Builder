import { DrawerProps, Drawer, SimpleGrid, Box, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Character } from "builder";
import { useBuilder } from "../builder/Builder";
import { mediaQuery, portraitHeight, portraitWidth } from "../style";
import Image from "next/image";
import { ReactNode } from "react";
import { NameText } from "../text/NameText";
import { PassiveSkillText } from "../text/SkillText";
import { EditorHeader } from "./EditorHeader";
import { JobDetail } from "./EditorJobDetail";
import { EditorLayout } from "./EditorLayout";
import { EditorPassivesCounterDetail as EditorPassivesCounterDetail } from "./EditorPassivesCountersDetail";

type EditorProps = {
  id: Character["id"];
  onClose: () => void;
} & Omit<DrawerProps, "opened" | "id">;

export const Editor = ({ id, onClose, ...props }: EditorProps) => {
  const enoughHeight = useMediaQuery(mediaQuery.enoughHeight.value);

  const { charactersById } = useBuilder();
  const character = charactersById?.[id];

  return (
    <Drawer
      opened={!!id}
      onClose={onClose}
      withOverlay={false}
      lockScroll={false}
      position={enoughHeight ? "left" : "bottom"}
      size={enoughHeight ? "unset" : "100%"}
      styles={(t) => ({
        drawer: {
          overflowY: "auto",
          backgroundColor: "black",
        },
        header: {
          display: "none",
        },
      })}
      {...props}
    >
      {character && (
        <EditorLayout
          header={<EditorHeader />}
          sections={[
            <JobDetail />,
            <JobDetail />,
            <EditorPassivesCounterDetail />,
          ]}
        />
      )}
    </Drawer>
  );
};
