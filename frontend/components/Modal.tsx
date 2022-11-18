import { ActionIcon, Box, Modal as MantineModal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode } from "react";
import { mediaQuery } from "./style";

type ModalProps = {
  onClose: () => void;
  onChange: () => void;
  opened: boolean;
  children: ReactNode;
  overflow?: boolean;
  headerContent?: ReactNode;
};

export const Modal = ({
  children,
  opened,
  onChange,
  onClose,
  overflow = true,
  headerContent,
}: ModalProps) => {
  const enoughHeight = useMediaQuery(mediaQuery.enoughHeight.value);
  return (
    <MantineModal
      overflow="inside"
      opened={opened}
      onClose={onClose}
      overlayOpacity={0.3}
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
          overflow: "visible",
        },
        body: {
          maxHeight: "100%",
          overflowY: overflow ? "auto" : "hidden",
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
        <Box>{headerContent}</Box>
        <HeaderButton onClick={onChange}>Ok</HeaderButton>
      </Box>
      <Box
        sx={(t) => ({
          height: "80vh",
        })}
      >
        {children}
      </Box>
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
