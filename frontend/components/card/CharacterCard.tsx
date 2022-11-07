import { Character } from "builder";
import { useState } from "react";
import { BaseCard } from "./BaseCard";
import { BaseCardAside } from "./BaseCardAside";
import { BaseCardFooter } from "./BaseCardFooter";
import { BaseCardPortrait } from "./BaseCardPortrait";
import { BaseCardSubtitle } from "./BaseCardSubtitle";
import { BaseCardTitle } from "./BaseCardTitle";
import { RiCloseFill } from "react-icons/ri";
import { Box, CloseButton } from "@mantine/core";
import { useBuilder } from "../builder/Builder";

type CharacterCardProps = {
  character: Character;
};

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const [hovered, setHovered] = useState(false);

  const { deleteCharacter } = useBuilder();

  return (
    <BaseCard
      background={<BaseCardPortrait {...character} />}
      title={<BaseCardTitle {...character} />}
      subtitle={<BaseCardSubtitle {...character} />}
      footer={<BaseCardFooter {...character} display={hovered} />}
      aside={<BaseCardAside {...character} />}
      controls={
        <CharacterControls
          display={hovered}
          onClick={() => deleteCharacter?.(character.id)}
        />
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
};

type CharacterControlsProps = {
  display: boolean;
  onClick: () => void;
};
const CharacterControls = ({ display, onClick }: CharacterControlsProps) => {
  return (
    <Box
      sx={(t) => ({
        color: t.colors.dark[2],
        opacity: display ? 1 : 0,
        "transition-property": "opacity",
        "transition-duration": "0.5s",
      })}
    >
      <CloseButton size={20} color="dark.2" onClick={onClick} />
    </Box>
  );
};
