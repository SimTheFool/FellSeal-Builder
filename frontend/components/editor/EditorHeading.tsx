import { Title } from "@mantine/core";
import { NameText } from "../text/NameText";

type EditorHeadingProps = { children: string };

export const EditorHeading = ({ children }: EditorHeadingProps) => {
  return (
    <NameText
      name={children}
      order={4}
      size="h4"
      align="left"
      readonly={false}
    />
  );
};
