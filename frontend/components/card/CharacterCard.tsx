import { Character } from "builder";
import { useEffect, useState } from "react";
import { BaseCard } from "./BaseCard";
import { BaseCardAside } from "./BaseCardAside";
import { BaseCardFooter } from "./BaseCardFooter";
import { BaseCardPortrait } from "./BaseCardPortrait";
import { BaseCardSubtitle } from "./BaseCardSubtitle";
import { BaseCardTitle } from "./BaseCardTitle";
import { RiCloseFill } from "react-icons/ri";
import { Box, Button, Center, CloseButton, Popover } from "@mantine/core";
import { useBuilder } from "../builder/Builder";
import { useDisclosure, useInterval } from "@mantine/hooks";

type CharacterCardProps = {
  character: Character;
};

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const [hovered, { close: leave, open: enter }] = useDisclosure(false);

  const { deleteCharacter } = useBuilder();

  return (
    <Box onMouseEnter={enter} onMouseLeave={leave}>
      <BaseCard
        background={<BaseCardPortrait {...character} />}
        title={<BaseCardTitle {...character} />}
        subtitle={<BaseCardSubtitle {...character} />}
        footer={<BaseCardFooter {...character} display={hovered} />}
        aside={<BaseCardAside {...character} />}
      />
      <CharacterControls
        display={hovered}
        onDelete={() => deleteCharacter?.(character.id)}
      />
    </Box>
  );
};

type CharacterControlsProps = {
  display: boolean;
  onDelete: () => void;
};
const CharacterControls = ({ onDelete, display }: CharacterControlsProps) => {
  const suppDuration = 1000;
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
