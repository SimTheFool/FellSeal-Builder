import {
  ActionIcon,
  ActionIconProps,
  CSSObject,
  MantineTheme,
} from "@mantine/core";
import { BsEyeFill } from "react-icons/bs";

type ViewButtonProps = ActionIconProps & {
  visible?: boolean;
  onClick?: () => void;
  sx?: (theme: MantineTheme) => CSSObject;
};
export const ViewButton = ({
  visible = true,
  onClick,
  sx,
  ...props
}: ViewButtonProps) => {
  return (
    <ActionIcon
      sx={(t) => ({
        opacity: !visible ? 0 : 1,
        pointerEvents: !visible ? "none" : "auto",
        "transition-property": "opacity",
        "transition-duration": "0.5s",
        ...sx?.(t),
      })}
      onClick={onClick}
      {...props}
    >
      <BsEyeFill size={18} />
    </ActionIcon>
  );
};
