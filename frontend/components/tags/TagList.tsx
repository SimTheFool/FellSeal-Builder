import {
  CSSObject,
  MantineTheme,
  SimpleGrid,
  SimpleGridProps,
} from "@mantine/core";
import { CharacterTag } from "builder";
import { TagIcon } from "./TagIcons";

type TagListProps = {
  tags?: CharacterTag[];
  sx?: (theme: MantineTheme) => CSSObject;
} & SimpleGridProps;

export const TagList = ({
  tags = [],
  sx,
  ...simpleGridProps
}: TagListProps) => {
  return (
    <SimpleGrid cols={1} sx={sx} {...simpleGridProps}>
      {tags.map((t) => (
        <TagIcon tag={t} key={t} />
      ))}
    </SimpleGrid>
  );
};
