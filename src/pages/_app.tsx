import type { AppProps } from "next/app";

import "src/lib/tailwind.css";
import { useState } from "react";
import Link from "next/link";
import {
  ActionIcon,
  Anchor,
  AppShell,
  Burger,
  ColorScheme,
  ColorSchemeProvider,
  Drawer,
  Footer,
  Group,
  Header,
  List,
  MantineProvider,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons";

import { useMediaQuery } from "src/lib/mantine";
import { pagesPath } from "src/lib/$path";

function App({ Component, pageProps }: AppProps) {
  const { colors } = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const largerThanXs = useMediaQuery("sm");
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const dark = colorScheme === "dark";
  const paths = [
    ["about", pagesPath.about.$url()],
    ["blog", pagesPath.blog.$url()],
    ["portfolio", pagesPath.portfolio.$url()],
    ["contact", pagesPath.contact.$url()],
  ] as const;

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionOptions={{ key: "mantine", prepend: false }}
        theme={{ colorScheme }}
      >
        <AppShell
          footer={
            <Footer height={65} p="md">
              <Text
                size="xs"
                weight={700}
                color={colors.gray[6]}
                align="center"
              >
                © ️2022 Shimabu IT University
              </Text>
            </Footer>
          }
          header={
            <Header
              height={65}
              className="flex justify-center border-none"
              fixed
            >
              <Group px={16} position="apart" className="max-w-5xl flex-grow">
                {largerThanXs || (
                  <>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((opened) => !opened)}
                      size="sm"
                      color={colors.gray[6]}
                    />
                    <Drawer
                      opened={opened}
                      onClose={() => setOpened(false)}
                      size="100%"
                      styles={{
                        drawer: { backgroundColor: colors.pink[6] },
                        header: { height: 65, margin: 0, paddingLeft: 16 },
                        title: { display: "none" },
                        closeButton: { color: "white" },
                      }}
                    >
                      <List px={24} py={20} spacing={16}>
                        {paths.map(([title, url], index) => {
                          return (
                            <List.Item key={index}>
                              <Link href={url} passHref>
                                <Anchor
                                  component="a"
                                  variant="text"
                                  weight={700}
                                  style={{ fontSize: 28, color: "white" }}
                                  onClick={() => setOpened(false)}
                                >
                                  {title[0].toUpperCase() + title.slice(1)}
                                </Anchor>
                              </Link>
                            </List.Item>
                          );
                        })}
                      </List>
                    </Drawer>
                  </>
                )}
                <Title order={4}>
                  <Link href="/">
                    <a>Takeyu IT University</a>
                  </Link>
                </Title>
                <Group>
                  {largerThanXs && (
                    <>
                      {paths.map(([title, url], index) => {
                        return (
                          <Link key={index} href={url} passHref>
                            <Anchor
                              component="a"
                              variant="text"
                              weight={700}
                              size="lg"
                              onClick={() => setOpened(false)}
                            >
                              {title[0].toUpperCase() + title.slice(1)}
                            </Anchor>
                          </Link>
                        );
                      })}
                    </>
                  )}
                  <ActionIcon
                    variant="default"
                    onClick={() => toggleColorScheme()}
                    size="lg"
                    radius="md"
                  >
                    {dark ? <IconSun /> : <IconMoon />}
                  </ActionIcon>
                </Group>
              </Group>
            </Header>
          }
          padding={0}
          styles={{ main: { paddingTop: 65 } }}
        >
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
