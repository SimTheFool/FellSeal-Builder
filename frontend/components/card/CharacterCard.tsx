import { Box, Button, Center } from "@mantine/core";
import { useDisclosure, useInterval } from "@mantine/hooks";
import { Character } from "builder";
import { ReactNode, useEffect, useState } from "react";
import { useBuilder } from "../builder/Builder";
import { EditButton } from "../buttons/EditButton";
import { ViewButton } from "../buttons/ViewButton";
import { BaseCard } from "./BaseCard";
import { BaseCardAside } from "./BaseCardAside";
import { BaseCardFooter } from "./BaseCardFooter";
import { BaseCardPortrait } from "./BaseCardPortrait";
import { BaseCardSubtitle } from "./BaseCardSubtitle";
import { BaseCardTitle } from "./BaseCardTitle";

type CharacterCardProps = {
  character: Character;
  onFocus: (id: Character["id"]) => void;
};

export const CharacterCard = ({ character, onFocus }: CharacterCardProps) => {
  const [hovered, { close: leave, open: enter }] = useDisclosure(false);
  const { deleteCharacter } = useBuilder();

  const handleFocusedClick = () => {
    if (!hovered) return;
    onFocus(character.id);
  };

  return (
    <CharacterCardControls
      hovered={hovered}
      onHover={enter}
      onHoverLeave={leave}
      onDelete={() => deleteCharacter?.(character.id)}
      card={
        <BaseCard
          onClick={handleFocusedClick}
          background={<BaseCardPortrait {...character} />}
          title={<BaseCardTitle {...character} />}
          subtitle={<BaseCardSubtitle {...character} />}
          footer={<BaseCardFooter {...character} display={hovered} />}
          aside={<BaseCardAside {...character} />}
        />
      }
    />
  );
};

type CharacterCardControlsProps = {
  hovered: boolean;
  onHover: () => void;
  onHoverLeave: () => void;
  onDelete: () => void;
  card: ReactNode;
};
const CharacterCardControls = ({
  hovered,
  onHover,
  onHoverLeave,
  onDelete,
  card,
}: CharacterCardControlsProps) => {
  return (
    <Box
      onMouseEnter={onHover}
      onMouseLeave={onHoverLeave}
      sx={(t) => ({
        position: "relative",
      })}
    >
      {card}
      <DeleteButtonProps display={hovered} onDelete={onDelete} />
      <ViewButton
        mt="xs"
        mr="sm"
        sx={(t) => ({
          position: "absolute",
          top: 0,
          right: 0,
        })}
        visible={hovered}
      />
    </Box>
  );
};

type DeleteButtonProps = {
  display: boolean;
  onDelete: () => void;
};
const DeleteButtonProps = ({ onDelete, display }: DeleteButtonProps) => {
  const suppDuration = 700;
  const [suppState, setSuppState] = useState(0);
  const suppRatio = Math.min((suppState / suppDuration) * 100, 100);

  const suppCounter = useInterval(() => setSuppState((s) => s + 30), 30);

  const stopSupp = () => {
    suppCounter.stop();
    setSuppState(0);
  };

  const startSupp = () => {
    suppCounter.start();
    const onMouseUp = () => {
      stopSupp();
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchend", onMouseUp);
    };
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchend", onMouseUp);
  };

  useEffect(() => {
    if (suppRatio < 100) return;
    onDelete();
  }, [suppRatio, onDelete]);

  return (
    <Center>
      <Button
        onTouchStart={startSupp}
        onMouseDown={startSupp}
        onMouseUp={stopSupp}
        onContextMenu={(e: any) => e.preventDefault()}
        size="sm"
        compact
        styles={(t) => ({
          root: {
            opacity: display ? 1 : 0,
            pointerEvents: display ? "auto" : "none",
            "transition-property": "opacity",
            "transition-duration": "0.5s",
            display: "inline",
            position: "relative",
            overflow: "hidden",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            height: "unset",
            backgroundColor: t.colors.white[1],
            color: t.colors.dark[4],
            boxShadow: t.shadows.md,
            "&:hover": {
              backgroundColor: t.fn.darken(t.colors.white[1], 0.2),
            },
          },
          inner: {
            display: "inline-block",
          },
        })}
      >
        <Box
          sx={(t) => ({
            position: "absolute",
            top: 0,
            left: 0,
            width: `${suppRatio}%`,
            height: "100%",
            backgroundColor: "black",
            opacity: 1,
          })}
        />
        Suppr.
      </Button>
    </Center>
  );
};
