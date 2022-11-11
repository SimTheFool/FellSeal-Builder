import { Drawer, DrawerProps } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Character } from "builder";
import { useBuilder } from "../builder/Builder";
import { mediaQuery } from "../style";
import { EditorHeader } from "./EditorHeader";
import { JobDetail } from "./EditorJobDetail";
import { EditorLayout } from "./EditorLayout";
import { EditorPassivesCounterDetail } from "./EditorPassivesCountersDetail";

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
      position={enoughHeight ? "left" : "right"}
      size={enoughHeight ? "unset" : "100%"}
      styles={(t) => ({
        drawer: {
          overflowY: "auto",
          backgroundColor: "black",
          perspective: "1px",
          borderTopLeftRadius: enoughHeight ? 0 : t.radius.md,
          borderBottomLeftRadius: enoughHeight ? 0 : t.radius.md,
          borderTopRightRadius: enoughHeight ? t.radius.md : 0,
          borderBottomRightRadius: enoughHeight ? t.radius.md : 0,
        },
        header: {
          display: "none",
        },
      })}
      {...props}
    >
      {character && (
        <EditorLayout
          header={<EditorHeader {...character} />}
          sections={[
            <JobDetail jobHash={character.job} />,
            <JobDetail jobHash={character.ability} />,
            <EditorPassivesCounterDetail
              passives={character.passives}
              counter={character.counter}
            />,
          ]}
        />
      )}
    </Drawer>
  );
};
