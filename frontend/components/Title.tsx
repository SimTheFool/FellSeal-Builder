import { Title as MantineTitle } from "@mantine/core";
import Image from "next/image";
import { mediaQuery } from "./style";

export const Title = () => (
  <MantineTitle
    order={1}
    align={"center"}
    sx={(t) => ({
      [mediaQuery.enoughHeight.media]: {
        height: "3em",
      },
      width: "100%",
      height: "2.3em",
      margin: "20px 0 20px 0",
      position: "relative",
    })}
  >
    <Image src="/title.svg" layout="fill" alt="Fell Seal Builder" />
  </MantineTitle>
);
