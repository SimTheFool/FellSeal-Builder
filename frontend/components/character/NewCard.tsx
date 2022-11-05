import { CardProps } from "@mantine/core";
import { Character } from "builder";
import { BaseCard } from "./BaseCard";

type NewCardProps = {
  label: string;
  onClick: () => void;
};

export const NewCard = ({ label, onClick }: NewCardProps) => {
  return <BaseCard name={label} onClick={onClick} />;
};
