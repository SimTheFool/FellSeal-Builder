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
          white: ["#FFF", "#EEE"],
        },
        shadows: {
          xs: "0px 0px 7px rgba(0, 0, 0, 0.65)",
          md: "0px 0px 20px rgba(0, 0, 0, 0.95)",
        },
        radius: {
          md: 20,
        },
        fontSizes: {
          xs: 11,
          sm: 14,
          md: 19,
          lg: 22,
          xl: 26,
        },
        fontFamily: "Baskerville",
        headings: {
          fontFamily: "Baskerville",
          sizes: {
            h3: {
              fontSize: 60,
              lineHeight: 0.45,
              fontWeight: 400,
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
