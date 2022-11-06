import { Character } from "builder";
import { BaseCard } from "./BaseCard";

type CharacterCardProps = {
  character: Character;
};

export const CharacterCard = ({ character }: CharacterCardProps) => {
  return <BaseCard {...character} />;
};
