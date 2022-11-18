import { Box, Title } from "@mantine/core";
import { EditButton } from "../buttons/EditButton";
import { NameText } from "../text/NameText";

type EditorHeadingProps = {
  children: string;
  onClick?: () => void;
  readonly?: boolean;
};

export const EditorHeading = ({
  children,
  onClick,
  readonly = false,
}: EditorHeadingProps) => {
  return (
    <Box>
      <NameText name={children} order={4} size="h4" align="left" />
      {!readonly && <EditButton onClick={onClick} />}
    </Box>
  );
};
