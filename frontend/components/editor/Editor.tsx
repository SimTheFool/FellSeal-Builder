import { ActionIcon, Box, Drawer, DrawerProps } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Character } from "builder";
import { useBuilder } from "../builder/Builder";
import { mediaQuery } from "../style";
import { EditorHeader } from "./EditorHeader";
import { MainJobDetail, SecondaryJobDetail } from "./EditorJobDetail";
import { EditorLayout } from "./EditorLayout";
import { EditorPassivesCounterDetail } from "./EditorPassivesCountersDetail";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

type EditorProps = {
  id: Character["id"];
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
} & Omit<DrawerProps, "opened" | "id">;

export const Editor = ({
  id,
  onClose,
  onPrevious,
  onNext,
  ...props
}: EditorProps) => {
  const enoughHeight = useMediaQuery(mediaQuery.enoughHeight.value);
  const { charactersById } = useBuilder();
  const character = charactersById?.[id];

  return (
    <Drawer
      opened={!!id}
      onClose={onClose}
      withOverlay={true}
      overlayOpacity={0}
      lockScroll={false}
      shadow="unset"
      position={enoughHeight ? "left" : "right"}
      size={enoughHeight ? "unset" : "80%"}
      styles={(t) => ({
        drawer: {
          marginTop: t.fontSizes.md,
          position: "absolute",
          overflow: "visible",
          backgroundColor: "unset",
          maxWidth: "80%",
        },
        header: {
          display: "none",
        },
      })}
      {...props}
    >
      <Box
        sx={(t) => ({
          position: "relative",
          height: "100%",
          overflow: "hidden",
          backgroundColor: "black",
          borderTopLeftRadius: enoughHeight ? 0 : t.radius.xl,
          borderTopRightRadius: enoughHeight ? t.radius.xl : 0,
          boxShadow: t.shadows.md,
        })}
      >
        {character && (
          <EditorLayout
            header={<EditorHeader {...character} />}
            sections={[
              <MainJobDetail
                jobHash={character.job}
                abilityHash={character.ability}
              />,
              <SecondaryJobDetail
                jobHash={character.job}
                abilityHash={character.ability}
              />,
              <EditorPassivesCounterDetail
                passives={character.passives}
                counter={character.counter}
              />,
            ]}
          />
        )}
      </Box>
      <Controls onUp={onPrevious} onDown={onNext} />
    </Drawer>
  );
};

type ControlsProps = {
  onUp: () => void;
  onDown: () => void;
};
export const Controls = ({ onUp, onDown }: ControlsProps) => {
  const enoughHeight = useMediaQuery(mediaQuery.enoughHeight.value);
  return (
    <Box
      sx={(t) => ({
        position: "absolute",
        left: enoughHeight ? "100%" : "unset",
        bottom: "0%",
        right: enoughHeight ? "unset" : "100%",
      })}
    >
      <ActionIcon variant="transparent" onClick={onUp}>
        <IoIosArrowUp />
      </ActionIcon>
      <ActionIcon variant="transparent" onClick={onDown}>
        <IoIosArrowDown />
      </ActionIcon>
    </Box>
  );
};
