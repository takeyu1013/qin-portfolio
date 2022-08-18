import type { AppProps } from "next/app";

import "src/lib/tailwind.css";
import { useState } from "react";
import Link from "next/link";
import {
  ActionIcon,
  Anchor,
  AppShell,
  Burger,
  Drawer,
  Footer,
  Group,
  Header,
  List,
  MantineProvider,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "src/lib/mantine";
import { IconMoon } from "@tabler/icons";

function App({ Component, pageProps }: AppProps) {
  const { colors } = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const largerThanXs = useMediaQuery("sm");
  const TITLES = ["about", "blog", "portfolio", "contact"] as const;

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      emotionOptions={{ key: "mantine", prepend: false }}
    >
      <AppShell
        navbar={
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
              {TITLES.map((title, index) => {
                return (
                  <List.Item key={index}>
                    <Link href={`/${title}`} passHref>
                      <Anchor
                        component="a"
                        variant="text"
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
        }
        footer={
          <Footer height={65} p="md">
            <Text size="xs" weight={700} color={colors.gray[6]} align="center">
              © ️2022 Shimabu IT University
            </Text>
          </Footer>
        }
        header={
          <Header
            height={65}
            p="md"
            className="flex items-center justify-between"
          >
            {largerThanXs || (
              <Burger
                opened={opened}
                onClick={() => setOpened((opened) => !opened)}
                size="sm"
                color={colors.gray[6]}
              />
            )}
            <Text size="lg" weight={700}>
              <Link href="/">
                <a>Takeyu IT University</a>
              </Link>
            </Text>
            <Group>
              {largerThanXs && (
                <>
                  {TITLES.map((title, index) => {
                    return (
                      <Link key={index} href={`/${title}`} passHref>
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
                onClick={() => {}}
                size="lg"
                radius="md"
              >
                <IconMoon />
              </ActionIcon>
            </Group>
          </Header>
        }
        padding={0}
      >
        <Component {...pageProps} />
      </AppShell>
    </MantineProvider>
  );
}

export default App;
