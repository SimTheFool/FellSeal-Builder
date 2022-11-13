import { ActionIcon, Box, Modal, TextInput } from "@mantine/core";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { portraitHeight, portraitWidth } from "../style";
import { BsCheckLg } from "react-icons/bs";

const importAll = (r: __WebpackModuleApi.RequireContext) => {
  let images: Record<string, StaticImageData> = {};
  r.keys().map((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

const images = importAll(
  require.context("../../public/portraits", false, /\.\/.*\.(png|jpe?g)$/)
);

type NamePortraitValue = [name: string, portrait: string];
type NamePortraitInputProps = {
  opened: boolean;
  onClose: () => void;
  value: NamePortraitValue;
  onChange: (value: NamePortraitValue) => void;
};
export const NamePortraitInput = ({
  opened,
  onClose,
  value: initialValue,
  onChange,
}: NamePortraitInputProps) => {
  const [[name, portrait], setValue] = useState(initialValue);
  const changeName = (newName: string) => setValue([newName, portrait]);
  const changePortrait = (newPortrait: string) => setValue([name, newPortrait]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Modal
      overflow="inside"
      opened={opened}
      onClose={onClose}
      overlayOpacity={0.5}
      styles={(t) => ({
        modal: {
          maxWidth: "90%",
          width: "650px",
          backgroundColor: t.colors.black,
        },
        header: {
          display: "none",
        },
      })}
    >
      <Box
        sx={(t) => ({
          position: "sticky",
          display: "flex",
          justifyContent: "space-between",
          top: 0,
          width: "100%",
          backgroundColor: t.colors.black,
          zIndex: 1,
        })}
      >
        <ActionIcon
          sx={(t) => ({
            width: "unset",
            display: "inline",
          })}
          variant="transparent"
          onClick={onClose}
        >
          Back
        </ActionIcon>
        <ActionIcon
          sx={(t) => ({
            width: "unset",
            display: "inline",
          })}
          variant="transparent"
          onClick={() => {
            onChange([name, portrait]);
            onClose();
          }}
        >
          Ok
        </ActionIcon>
      </Box>
      <TextInput
        py="md"
        variant="unstyled"
        value={name}
        onChange={(v) => changeName(v.target.value)}
        autoFocus
        size="xl"
      />
      <Box
        sx={(t) => ({
          display: "flex",
          flexWrap: "wrap",
          position: "relative",
        })}
      >
        {Object.entries(images).map(([portraitName, portraitImage]) => (
          <Portrait
            key={portraitName}
            portraitName={portraitName}
            portraitImage={portraitImage}
            selected={portraitName === portrait}
            onSelect={(portraitName) => changePortrait(portraitName)}
          />
        ))}
      </Box>
    </Modal>
  );
};

type PortraitProps = {
  portraitName: string;
  portraitImage: StaticImageData;
  selected: boolean;
  onSelect: (portraitName: string) => void;
};
const Portrait = ({
  portraitName,
  portraitImage,
  selected,
  onSelect,
}: PortraitProps) => {
  return (
    <Box
      m="sm"
      sx={(t) => ({
        position: "relative",
      })}
    >
      <Image
        onClick={() => onSelect(portraitName)}
        src={portraitImage}
        layout="fixed"
        width={portraitWidth / 2.5}
        height={portraitHeight / 2.5}
      />
      {selected && (
        <Box
          sx={(t) => ({
            position: "absolute",
            top: 0,
            right: 0,
          })}
        >
          <BsCheckLg />
        </Box>
      )}
    </Box>
  );
};
