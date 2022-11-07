import Image from "next/image";
import { portraitHeight, portraitWidth } from "../style";

type BaseCardPortraitProps = { portrait?: string };

export const BaseCardPortrait = ({ portrait }: BaseCardPortraitProps) => {
  return (
    <Image
      src={`/portraits/${portrait ?? "default.png"}`}
      width={portraitWidth}
      height={portraitHeight}
    />
  );
};
