import { Box } from "@mantine/core";
import type { NextPage } from "next";
import Image from "next/image";
import portrait1 from "../assets/portraits/3-Large.png";
import { Header } from "../components/Header";

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
          backgroundColor: t.colors.back_grey,
          maxWidth: "900px",
          margin: "auto",
        })}
      >
        <Box component="div" sx={(t) => ({ visibility: "hidden" })}>
          <Header />
        </Box>
        <Box
          component="ul"
          sx={(t) => ({
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            listStyle: "none",
            margin: 0,
            padding: 0,
            ":after": {
              content: "'aa'",
              flexBasis: "228px",
            },
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
        </Box>
      </Box>
    </>
  );
};

export default Home;

const Portrait = () => {
  return (
    <Box component="li" sx={(t) => ({})}>
      <Image src={portrait1} width={228} height={340} />
    </Box>
  );
};
