import { Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { mediaQuery, portraitWidth, portraitHeight } from "../style";
import { NameText } from "../text/NameText";
import Image from "next/image";
import { Character } from "builder";

type EditorHeaderProps = {
  portrait?: Character["portrait"];
  name?: Character["name"];
};
export const EditorHeader = ({ portrait, name }: EditorHeaderProps) => {
  const enoughHeight = useMediaQuery(mediaQuery.enoughHeight.value);
  return (
    <Box
      sx={(t) => ({
        width: enoughHeight ? "100%" : portraitWidth * 1.2,
        height: "100%",
        display: "flex",
        flexDirection: "column-reverse",
        position: "relative",
      })}
    >
      <Box
        sx={(t) => ({
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        })}
      >
        <Box
          sx={(t) => ({
            width: "100%",
            position: "absolute",
            top: "50%",
            transform: "translateY(-40%)",
            zIndex: -1,
          })}
        >
          <Image
            src={`/portraits/${portrait}`}
            layout={enoughHeight ? "responsive" : "fixed"}
            width={portraitWidth * 1.2}
            height={portraitHeight * 1.2}
          />
          <Box
            sx={(t) => ({
              top: 0,
              position: "absolute",
              width: "100%",
              height: "100%",
              background: enoughHeight
                ? "none"
                : `linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 90%, rgba(0,0,0,1) 95%, rgba(0,0,0,1) 100%);`,
            })}
          />
        </Box>
      </Box>
      <NameText name={name} align="left" pl="xl" />
    </Box>
  );
};
