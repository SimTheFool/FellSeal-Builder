import { Box, Title } from "@mantine/core";
import { EditButton } from "../buttons/EditButton";
import { NameText } from "../text/NameText";

type EditorHeadingProps = { children: string };

export const EditorHeading = ({ children }: EditorHeadingProps) => {
  return (
    <Box>
      <NameText name={children} order={4} size="h4" align="left" />
      <EditButton />
    </Box>
  );
};
