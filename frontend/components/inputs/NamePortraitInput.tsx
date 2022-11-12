import { Box, Drawer, Modal, TextInput } from "@mantine/core";
import { map } from "lodash";
import { portraitHeight, portraitWidth } from "../style";
import Image, { StaticImageData } from "next/image";

const importAll = (r: __WebpackModuleApi.RequireContext) => {
  let images: Record<string, StaticImageData> = {};
  console.log("aaa", r.keys());
  r.keys().map((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

const images = importAll(
  require.context("../../public/portraits", false, /\.\/.*\.(png|jpe?g)$/)
);

console.log(images);

type NameProtraitInputProps = { opened: boolean; onClose: () => void };
export const NamePortraitInput = ({
  opened,
  onClose,
}: NameProtraitInputProps) => {
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
      })}
    >
      <TextInput
        placeholder="Name"
        label="Character name"
        variant="unstyled"
        radius="md"
        py="xl"
      />
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
        {Object.entries(images).map(([name, image]) => (
          <Portrait name={name} image={image} />
        ))}
        {Object.entries(images).map(([name, image]) => (
          <Portrait name={name} image={image} />
        ))}
        {Object.entries(images).map(([name, image]) => (
          <Portrait name={name} image={image} />
        ))}
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
      width={portraitWidth / 3}
      height={portraitHeight / 3}
    />
  );
};
