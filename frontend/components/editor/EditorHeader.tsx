import { ActionIcon, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { mediaQuery, portraitWidth, portraitHeight } from "../style";
import { NameText } from "../text/NameText";
import Image from "next/image";
import { Character } from "builder";
import { NamePortraitInput } from "../inputs/NamePortraitInput";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";

type EditorHeaderProps = {
  portrait?: Character["portrait"];
  name?: Character["name"];
};
export const EditorHeader = ({
  portrait = "default.png",
  name = "Name",
}: EditorHeaderProps) => {
  const enoughHeight = useMediaQuery(mediaQuery.enoughHeight.value);
  const hugeHeight = useMediaQuery(mediaQuery.hugeHeight.value);
  const [inputOpened, setinputOpened] = useState(false);

  return (
    <>
      <ActionIcon
        m="sm"
        sx={(t) => ({
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 2,
        })}
        onClick={() => setinputOpened(true)}
      >
        <AiFillEdit />
      </ActionIcon>

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
            zIndex: 1,
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
              src={`/portraits/${portrait || "default.png"}`}
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
        <NameText
          name={name || "Name"}
          align="left"
          ml={hugeHeight ? "xl" : 0}
          pl="xl"
          sx={(t) => ({
            zIndex: 2,
            width: "100px",
          })}
          size={enoughHeight ? "h2" : "h3"}
        />

        {hugeHeight && (
          <NameText
            name={name || "Name"}
            align="left"
            sx={(t) => ({
              position: "absolute",
              transform: "rotateZ(-90deg) translateX(-30px)",
              transformOrigin: "top left",
              zIndex: 2,
              opacity: 0.2,
            })}
            size={"h1"}
          />
        )}
        <NamePortraitInput
          value={[name, portrait]}
          onChange={(value) => {}}
          opened={inputOpened}
          onClose={() => setinputOpened(false)}
        />
      </Box>
    </>
  );
};
