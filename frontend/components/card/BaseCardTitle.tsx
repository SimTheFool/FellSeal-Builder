import { Title } from "@mantine/core";

type BaseCardTitleProps = { name?: string };

export const BaseCardTitle = ({ name }: BaseCardTitleProps) => {
  return (
    <Title
      order={3}
      align={"center"}
      size="h3"
      sx={(t) => ({
        visibility: name ? "inherit" : "hidden",
      })}
    >
      {name ?? "hidden"}
    </Title>
  );
};
