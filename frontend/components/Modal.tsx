import { ActionIcon, Box, Modal as MantineModal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode } from "react";
import { mediaQuery } from "./style";

type ModalProps = {
  onClose: () => void;
  onChange: () => void;
  opened: boolean;
  children: ReactNode;
};

export const Modal = ({ children, opened, onChange, onClose }: ModalProps) => {
  const enoughHeight = useMediaQuery(mediaQuery.enoughHeight.value);
  return (
    <MantineModal
      overflow="inside"
      opened={opened}
      onClose={onClose}
      overlayOpacity={0.1}
      overlayColor={"white"}
      styles={(t) => ({
        inner: {
          paddingTop: enoughHeight ? t.fontSizes.md : t.fontSizes.xs,
          paddingBottom: enoughHeight ? t.fontSizes.md : t.fontSizes.xs,
          alignItems: "stretch",
        },
        modal: {
          maxWidth: "90%",
          width: "650px",
          maxHeight: "100%",
          backgroundColor: t.colors.black,
        },
        body: {
          maxHeight: "100%",
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
        <HeaderButton onClick={onClose}>Back</HeaderButton>
        <HeaderButton onClick={onChange}>Ok</HeaderButton>
      </Box>
      {children}
    </MantineModal>
  );
};

type HeaderButtonProps = {
  onClick: () => void;
  children: ReactNode;
};
const HeaderButton = ({ onClick, children }: HeaderButtonProps) => {
  return (
    <ActionIcon
      sx={(t) => ({
        width: "unset",
        display: "inline",
      })}
      variant="transparent"
      onClick={onClick}
    >
      {children}
    </ActionIcon>
  );
};
