import { TextProps, Title } from "@mantine/core";

type NameTextProps = { name?: string } & TextProps;
export const NameText = ({ name, ...props }: NameTextProps) => {
  return (
    <Title
      order={3}
      align={"center"}
      size="h3"
      sx={(t) => ({
        visibility: name ? "inherit" : "hidden",
        color: t.colors.white[0],
      })}
      {...props}
    >
      {name ?? "hidden"}
    </Title>
  );
};
