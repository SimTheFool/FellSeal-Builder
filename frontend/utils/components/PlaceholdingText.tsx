import { CSSObject, MantineTheme, Sx, Text, TextProps } from "@mantine/core";
import { MouseEvent } from "react";

type PlaceholdingTextProps = Omit<TextProps, "sx"> & {
  children?: string;
  sx?: (theme: MantineTheme) => CSSObject;
};

export const PlaceholdingText = ({
  children,
  sx,
  ...textProps
}: PlaceholdingTextProps) => {
  return (
    <Text
      size="md"
      sx={(t) => ({
        ...sx?.(t),
        visibility: children ? "inherit" : "hidden",
      })}
      {...textProps}
    >
      {children || "hidden"}
    </Text>
  );
};
