import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Global } from "@mantine/core";
import { BuilderProvider } from "../components/builder/Builder";
import { TranslationProvider } from "../components/translations/Translate";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        colors: {
          back_grey: ["#26262688"],
          white: ["#FFF", "#EEE", "#555", "#333"],
          black: ["#000"],
        },
        shadows: {
          xs: "0px 0px 7px rgba(0, 0, 0, 0.65)",
          md: "0px 0px 20px rgba(0, 0, 0, 0.95)",
        },
        radius: {
          xs: 8,
          sm: 11,
          md: 19,
        },
        fontSizes: {
          xs: 11,
          sm: 14,
          md: 19,
          lg: 24,
          xl: 50,
        },
        fontFamily: "Baskerville",
        headings: {
          fontFamily: "Baskerville",
          sizes: {
            h1: {
              fontSize: 170,
              lineHeight: 0.45,
              fontWeight: 400,
            },
            h2: {
              fontSize: 95,
              lineHeight: 0.45,
              fontWeight: 400,
            },
            h3: {
              fontSize: 60,
              lineHeight: 0.45,
              fontWeight: 400,
            },
            h4: {
              fontSize: 30,
              fontWeight: 700,
            },
          },
        },
      }}
    >
      <Global
        styles={(t) => [
          {
            "@font-face": {
              fontFamily: "Baskerville",
              src: `url('/fonts/baskerville.ttf')`,
              fontStyle: "normal",
            },
          },
          {
            "@font-face": {
              fontFamily: "Libre Baskerville",
              src: `url('/fonts/LibreBaskerville-Regular.ttf')`,
              fontStyle: "normal",
            },
          },
          {
            "*::-webkit-scrollbar": {
              display: "none",
            },
          },
        ]}
      />
      <BuilderProvider>
        <TranslationProvider>
          <Component {...pageProps} />
        </TranslationProvider>
      </BuilderProvider>
    </MantineProvider>
  );
}

export default MyApp;
