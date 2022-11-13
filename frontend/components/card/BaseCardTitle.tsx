import { Title } from "@mantine/core";
import { NameText } from "../text/NameText";

type BaseCardTitleProps = { name?: string; readonly?: boolean };

export const BaseCardTitle = ({ name, readonly }: BaseCardTitleProps) => {
  return <NameText name={name} />;
};
