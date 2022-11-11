import { Title } from "@mantine/core";

type EditorHeadingProps = { children: string };

export const EditorHeading = ({ children }: EditorHeadingProps) => {
  return (
    <Title order={4} size="h4" color="white.0">
      {children}
    </Title>
  );
};
