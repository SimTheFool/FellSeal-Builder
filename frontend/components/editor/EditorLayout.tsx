import { Box, SimpleGrid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode } from "react";
import { mediaQuery } from "../style";

type EditorLayout = {
  header: ReactNode;
  sections: ReactNode[];
};
export const EditorLayout = ({ header, sections }: EditorLayout) => {
  const enoughHeight = useMediaQuery(mediaQuery.enoughHeight.value);
  return (
    <Box
      sx={(t) => ({
        height: "100%",
        overflowX: "auto",
      })}
    >
      <Box
        sx={(t) => ({
          position: "relative",
          height: "20%",
          overflow: "hidden",
        })}
      >
        {header}
      </Box>

      <SimpleGrid verticalSpacing={0} cols={enoughHeight ? 1 : 3}>
        {sections.map((s) => (
          <Box
            sx={(t) => ({
              maxWidth: 300,
            })}
            pl="xl"
            mt="xl"
          >
            {s}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};
