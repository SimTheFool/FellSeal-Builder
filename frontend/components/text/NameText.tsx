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
  readonly?: boolean;
  onClick?: () => void;
  sx?: (theme: MantineTheme) => CSSObject;
};
export const NameText = ({
  name,
  readonly = true,
  onClick,
  sx,
  ...props
}: NameTextProps) => {
  return (
    <Title
      order={3}
      align={"center"}
      size="h3"
      sx={(t) => ({
        ...sx?.(t),
        visibility: name ? "inherit" : "hidden",
        color: t.colors.white[0],
      })}
      {...props}
    >
      {name ?? "hidden"}
      <ActionIcon
        ml="sm"
        sx={(t) => ({
          display: "inline-flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          opacity: readonly ? 0 : 1,
          pointerEvents: readonly ? "none" : "auto",
          "transition-property": "opacity",
          "transition-duration": "0.5s",
        })}
        onClick={onClick}
      >
        <AiFillEdit viewBox="0 0 1024 750" />
      </ActionIcon>
    </Title>
  );
};
