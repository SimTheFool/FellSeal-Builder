import { ActionIcon, CSSObject, MantineTheme, Sx } from "@mantine/core";
import { AiFillEdit } from "react-icons/ai";

type EditButtonProps = {
  onClick?: () => void;
  sx?: (theme: MantineTheme) => CSSObject;
};
export const EditButton = ({ onClick, sx }: EditButtonProps) => {
  return (
    <ActionIcon
      ml="md"
      sx={(t) => ({
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        ...sx?.(t),
      })}
      onClick={onClick}
    >
      <AiFillEdit viewBox="0 0 1024 750" />
    </ActionIcon>
  );
};
