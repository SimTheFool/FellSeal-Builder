import { Box, Drawer, Modal, Text, TextInput } from "@mantine/core";
import { map } from "lodash";
import { portraitHeight, portraitWidth } from "../style";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

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

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Portrait and name"
      styles={(t) => ({
        modal: {
          maxWidth: "90%",
          width: "unset",
        },
        header: {
          display: "none",
        },
      })}
    >
      <TextInput
        placeholder="Name"
        label="Character name:"
        variant="unstyled"
        radius="md"
        pb="xl"
        value={name}
        onChange={(v) => changeName(v.target.value)}
        size="md"
        autoFocus
      />
      <Text size="md">Portrait:</Text>
      <Box
        sx={(t) => ({
          display: "flex",
          flexWrap: "wrap",
          position: "relative",
        })}
      >
        {Object.entries(images).map(([name, image]) => (
          <Portrait name={name} image={image} />
        ))}
      </Box>
    </Modal>
  );
};

type PortraitProps = { name: string; image: StaticImageData };
const Portrait = ({ name, image }: PortraitProps) => {
  return (
    <Image
      src={image}
      layout="intrinsic"
      width={portraitWidth / 2.5}
      height={portraitHeight / 2.5}
    />
  );
};
