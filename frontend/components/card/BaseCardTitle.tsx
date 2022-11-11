import { Title } from "@mantine/core";
import { NameText } from "../text/NameText";

type BaseCardTitleProps = { name?: string };

export const BaseCardTitle = ({ name }: BaseCardTitleProps) => {
  return <NameText name={name} />;
};
