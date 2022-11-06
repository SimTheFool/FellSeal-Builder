import { Box } from "@mantine/core";
import { Character, CharacterTag } from "builder";
import Image from "next/image";

const iconsData: Record<CharacterTag, [svgPath: string, alt: string]> = {
  physical: ["/icons/physical.svg", "physical damage"],
  magickal: ["/icons/magickal.svg", "magickal damage"],
  support: ["/icons/support.svg", "support"],
  tank: ["/icons/tank.svg", "tank"],
  heal: ["/icons/heal.svg", "heal"],
  alteration: ["/icons/alteration.svg", "negative status effects"],
  mobility: ["/icons/mobility.svg", "mobile"],
  special: ["/icons/special.svg", "miscellaneous - special"],
};

type TagIconProps = { tag: CharacterTag };

export const TagIcon = ({ tag }: TagIconProps) => {
  const [svgPath, alt] = iconsData[tag];
  return (
    <Box
      sx={(t) => ({
        position: "relative",
        width: "20px",
        height: "20px",
      })}
    >
      <Image src={svgPath} layout="fill" alt={alt} />
    </Box>
  );
};
