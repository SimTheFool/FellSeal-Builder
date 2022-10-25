import { Box } from "@mantine/core";
import type { NextPage } from "next";
import Image from "next/image";
import portrait1 from "../assets/portraits/3-Large.png";
import { Header } from "../components/Header";

const imageHeight = 340;
const margin = 10;

const Home: NextPage = () => {
  return (
    <>
      <Box
        component="header"
        sx={(t) => ({
          left: 0,
          position: "fixed",
          width: "100%",
          zIndex: -1,
        })}
      >
        <Header />
      </Box>

      <Box
        component="main"
        sx={(t) => ({
          [`@media (min-height: ${1.7 * imageHeight}px)`]: {
            maxWidth: "900px",
            margin: "auto",
            width: "unset",
            position: "relative",
            padding: 0,
          },
          backgroundColor: t.colors.back_grey,
          position: "fixed",
          bottom: 0,
          width: "100%",
          overflow: "auto",
          padding: margin,
        })}
      >
        <Box component="div" sx={(t) => ({ visibility: "hidden" })}>
          <Header />
        </Box>
        <Box
          component="ul"
          sx={(t) => ({
            [`@media (min-height: ${1.7 * imageHeight}px)`]: {
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              ":after": {
                content: "'aa'",
                flexBasis: "228px",
              },
            },
            display: "flex",
            listStyle: "none",
            margin: 0,
            padding: 0,
            li: {
              flexGrow: 0,
              flexShrink: 0,
            },
          })}
        >
          <Portrait />
          <Portrait />
          <Portrait />
          <Portrait />
          <Portrait />
          <Portrait />
          <Portrait />
          <Portrait />
          <Portrait />
          <Portrait />
          <Portrait />
          <Portrait />
          <Portrait />
          <Portrait />
          <Portrait />
        </Box>
      </Box>
    </>
  );
};

export default Home;

const Portrait = () => {
  return (
    <Box
      component="li"
      sx={(t) => ({
        height: imageHeight,
        margin,
      })}
    >
      <Image src={portrait1} width={228} height={imageHeight} />
    </Box>
  );
};
