import { Box } from "@mantine/core";
import { mediaQuery } from "./style";

type LayoutProps = {
  title: JSX.Element;
  placeholder: JSX.Element;
  characterList: JSX.Element;
};

export const Layout = ({ title, placeholder, characterList }: LayoutProps) => {
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
        {title}
      </Box>

      <Box
        component="div"
        sx={(t) => ({
          left: 0,
          position: "fixed",
          width: "100%",
          height: "100%",
          zIndex: -2,
          backgroundImage: 'url("./background.png")',
          "background-size": "cover",
          "background-repeat": "no-repeat",
          "background-position": "center",
        })}
      />

      <Box
        component="main"
        sx={(t) => ({
          [mediaQuery.enoughHeight]: {
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
          padding: 10,
        })}
      >
        <Box
          component="div"
          sx={(t) => ({
            [mediaQuery.enoughHeight]: {
              display: "block",
            },
            display: "none",
            visibility: "hidden",
          })}
        >
          {placeholder}
        </Box>

        {characterList}
      </Box>
    </>
  );
};
