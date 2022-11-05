import { Character } from "builder";
import { BaseCard } from "./BaseCard";

type NewCardProps = {
  label: string;
};

export const NewCard = ({ label }: NewCardProps) => {
  return <BaseCard name={label} />;
};
