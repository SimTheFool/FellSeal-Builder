import { Box, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { Modal } from "../Modal";
import { mediaQuery, portraitHeight, portraitWidth } from "../style";

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
  const [value, setValue] = useState(initialValue);
  const [name, portrait] = value;
  const changeName = (newName: string) => setValue([newName, portrait]);
  const changePortrait = (newPortrait: string) => setValue([name, newPortrait]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      onChange={() => {
        onChange([name, portrait]);
        onClose();
      }}
    >
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
