import { Box, SimpleGrid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode } from "react";
import { TagsInput } from "../inputs/TagsInput";
import { mediaQuery, portraitHeight } from "../style";

type EditorLayout = {
  header: ReactNode;
  sections: ReactNode[];
  tags: ReactNode;
};
export const EditorLayout = ({ header, sections, tags }: EditorLayout) => {
  const enoughHeight = useMediaQuery(mediaQuery.enoughHeight.value);
  const hugeHeight = useMediaQuery(mediaQuery.hugeHeight.value);
  return (
    <Box
      sx={(t) => ({
        height: "100%",
        overflowX: "auto",
        position: "relative",
      })}
    >
      <Box
        sx={(t) => ({
          position: "relative",
          height: hugeHeight ? portraitHeight : "20%",
          overflow: "visible",
        })}
      >
        {header}
      </Box>

      <SimpleGrid verticalSpacing={0} spacing={0} cols={enoughHeight ? 1 : 3}>
        {sections.map((s) => (
          <Box
            sx={(t) => ({
              maxWidth: 350,
            })}
            pl="xl"
            mt="md"
          >
            {s}
          </Box>
        ))}
      </SimpleGrid>

      <Box
        sx={(t) => ({
          position: "absolute",
          left: enoughHeight ? "unset" : "50%",
          right: enoughHeight ? 0 : "unset",
          transform: enoughHeight ? "unset" : "translateX(-50%)",
          bottom: 0,
        })}
      >
        {tags}
      </Box>
    </Box>
  );
};
