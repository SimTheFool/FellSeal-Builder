import {
  ActionIcon,
  CSSObject,
  MantineTheme,
  Sx,
  TextProps,
  Title,
  TitleProps,
} from "@mantine/core";
import { AiFillEdit } from "react-icons/ai";

type NameTextProps = TitleProps & {
  name?: string;
  onClick?: () => void;
  sx?: (theme: MantineTheme) => CSSObject;
};
export const NameText = ({ name, onClick, sx, ...props }: NameTextProps) => {
  return (
    <Title
      order={3}
      align={"center"}
      size="h3"
      sx={(t) => ({
        display: "inline",
        visibility: name ? "inherit" : "hidden",
        color: t.colors.white[0],
        ...sx?.(t),
      })}
      {...props}
    >
      {name ?? "hidden"}
    </Title>
  );
};
