import type { AppProps } from "next/app";

import "src/lib/tailwind.css";
import { useState } from "react";
import Link from "next/link";
import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  CloseButton,
  Footer,
  Group,
  Header,
  List,
  MantineProvider,
  MediaQuery,
  Modal,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "src/lib/mantine";
import { IconMoon } from "@tabler/icons";

function App({ Component, pageProps }: AppProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const largerThanXs = useMediaQuery("sm");

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      emotionOptions={{ key: "mantine", prepend: false }}
    >
      <AppShell
        navbar={
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              styles={{
                inner: { padding: 0 },
                modal: {
                  backgroundColor: theme.colors.pink[6],
                },
                header: { display: "none" },
              }}
              radius={0}
              padding={0}
            >
              <Box p={20}>
                <CloseButton
                  size={28}
                  variant="filled"
                  color="pink"
                  onClick={() => setOpened(false)}
                />
              </Box>
              <List
                styles={{
                  item: { color: "white", fontWeight: 700, fontSize: 28 },
                }}
                px={24}
                py={20}
                spacing={16}
              >
                <List.Item>
                  <Link href="/about" passHref>
                    <a onClick={() => setOpened(false)}>About</a>
                  </Link>
                </List.Item>
                <List.Item>
                  <Link href="/blog" passHref>
                    <a onClick={() => setOpened(false)}>Blog</a>
                  </Link>
                </List.Item>
                <List.Item>
                  <Link href="/portfolio" passHref>
                    <a onClick={() => setOpened(false)}>Portfolio</a>
                  </Link>
                </List.Item>
                <List.Item>
                  <Link href="/contact" passHref>
                    <a onClick={() => setOpened(false)}>Contact</a>
                  </Link>
                </List.Item>
              </List>
            </Modal>
          </MediaQuery>
        }
        footer={
          <Footer height={65} p="md">
            <Text size="xs" weight={700} color="dimmed" align="center">
              © ️2022 Takeyu IT University
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
                color={theme.colors.gray[6]}
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
                  <Text size="lg" weight={700}>
                    About
                  </Text>
                  <Text size="lg" weight={700}>
                    Blog
                  </Text>
                  <Text size="lg" weight={700}>
                    Portfolio
                  </Text>
                  <Text size="lg" weight={700}>
                    Contact
                  </Text>
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
