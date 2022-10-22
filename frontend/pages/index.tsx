import {
  Grid,
  Container,
  Title,
  Space,
  SimpleGrid,
  Button,
  Center,
} from "@mantine/core";
import type { NextPage } from "next";
import Image from "next/image";
import portrait1 from "../assets/portraits/1-large.png";

const Home: NextPage = () => {
  return (
    <>
      <header>
        <Grid
          gutter={0}
          p={"lg"}
          sx={(t) => ({
            backgroundColor: t.colors["back-hard"],
          })}
        >
          <Grid.Col span={2}>1</Grid.Col>
          <Grid.Col span={8}>
            <Title order={1} align={"center"}>
              Fell Seal Builder
            </Title>
          </Grid.Col>
          <Grid.Col span={2}>3</Grid.Col>
        </Grid>
      </header>

      <main>
        <SimpleGrid
          cols={4}
          m="lg"
          breakpoints={[
            { maxWidth: "md", cols: 5, spacing: "md" },
            { maxWidth: "sm", cols: 4, spacing: "sm" },
            { maxWidth: "xs", cols: 3, spacing: "sm" },
          ]}
        >
          <Center>
            <Button>Add</Button>
          </Center>
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
        </SimpleGrid>
      </main>
    </>
  );
};

export default Home;

const Portrait = () => {
  return <Image src={portrait1} layout="responsive" width={228} height={340} />;
};
