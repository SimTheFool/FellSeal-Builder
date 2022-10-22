import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Global } from "@mantine/core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withNormalizeCSS
      theme={{
        colors: {
          "back-hard": ["#AA7739"],
          "back-light": ["#FFD9AA"],
        },
      }}
    >
      <Global
        styles={(t) => ({
          "*": {
            boxSizing: "border-box",
          },
          html: {
            backgroundColor: t.colors["back-light"],
          },
        })}
      />
      <Component {...pageProps} />{" "}
    </MantineProvider>
  );
}

export default MyApp;
