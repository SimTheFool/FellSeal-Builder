import { Box, BoxProps } from "@mantine/core";
import { CharacterTag } from "builder";
import { ReactNode } from "react";
import { iconsData, TagIcon } from "../tags/TagIcons";

type TagsInputProps = {
  value: CharacterTag[];
  onChange?: (value: CharacterTag[]) => void;
};
export const TagsInput = ({ value, onChange }: TagsInputProps) => {
  const toggleTag = (tag: CharacterTag) => {
    const tagIndex = value.findIndex((t) => t === tag);
    if (tagIndex < 0) {
      onChange?.([...value, tag]);
      return;
    }
    const newTags = [...value];
    newTags.splice(tagIndex, 1);
    onChange?.(newTags);
  };

  return (
    <Box
      sx={(t) => ({
        padding: 0,
        margin: 0,
        listStyle: "none",
      })}
      component="ul"
    >
      {Object.keys(iconsData).map((name) => (
        <TagButton
          py="xs"
          selected={value.includes(name as CharacterTag)}
          onClick={() => toggleTag(name as CharacterTag)}
        >
          <TagIcon tag={name as CharacterTag} />
        </TagButton>
      ))}
    </Box>
  );
};

type TagButtonProps = BoxProps & {
  children: ReactNode;
  selected?: boolean;
  onClick: () => void;
};
const TagButton = ({
  children,
  selected,
  onClick,
  ...props
}: TagButtonProps) => {
  return (
    <Box
      pt={4}
      pb={4}
      px={3}
      m="xs"
      component="li"
      sx={(t) => ({
        opacity: selected ? 1 : 0.5,
      })}
      onClick={onClick}
      {...props}
    >
      {children}
    </Box>
  );
};
