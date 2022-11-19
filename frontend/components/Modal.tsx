import {
  ActionIcon,
  ActionIconProps,
  Box,
  Modal as MantineModal,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode } from "react";
import { BsArrowLeftShort, BsCheck } from "react-icons/bs";
import { mediaQuery } from "./style";

type ModalProps = {
  onClose: () => void;
  onChange: () => void;
  opened: boolean;
  children: ReactNode;
  overflow?: boolean;
  headerContent?: ReactNode;
  disabled?: boolean;
};

export const Modal = ({
  children,
  opened,
  onChange,
  onClose,
  overflow = true,
  headerContent,
  disabled = false,
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
        <HeaderButton onClick={onClose}>
          <BsArrowLeftShort size={25} />
        </HeaderButton>
        <Box>{headerContent}</Box>
        <HeaderButton onClick={onChange} disabled={disabled}>
          <BsCheck size={25} />
        </HeaderButton>
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

type HeaderButtonProps = ActionIconProps & {
  onClick: () => void;
  children: ReactNode;
};
const HeaderButton = ({ onClick, children, ...props }: HeaderButtonProps) => {
  return (
    <ActionIcon
      sx={(t) => ({
        width: "unset",
        display: "inline",
        "&:disabled": {
          color: t.colors.white[3],
        },
      })}
      variant="transparent"
      onClick={onClick}
      {...props}
    >
      {children}
    </ActionIcon>
  );
};
