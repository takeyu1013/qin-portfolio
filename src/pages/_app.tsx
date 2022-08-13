import type { AppProps } from "next/app";

import "src/lib/tailwind.css";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  CloseButton,
  Footer,
  Header,
  List,
  MantineProvider,
  MediaQuery,
  Modal,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "src/lib/mantine";

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
                    {/* <Anchor component="a">About</Anchor> */}
                    <a onClick={() => setOpened(false)}>About</a>
                  </Link>
                </List.Item>
                <List.Item>Blog</List.Item>
                <List.Item>Portfolio</List.Item>
                <List.Item>Contact</List.Item>
              </List>
            </Modal>
          </MediaQuery>
        }
        footer={
          <Footer height={60} p="md">
            Application footer
          </Footer>
        }
        header={
          <Header height={65} p="md" className="flex justify-center">
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
              className="w-full max-w-5xl justify-between"
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                />
              </MediaQuery>
              <Text size="lg" weight={700}>
                <Link href="/">
                  <a>Takeyu IT University</a>
                </Link>
              </Text>
              <div className="flex items-center gap-4">
                {largerThanXs ? (
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
                ) : undefined}
                <ActionIcon
                  variant="default"
                  onClick={() => {}}
                  size="lg"
                  radius="md"
                  className="ml-auto"
                >
                  <Image src="/moon.svg" width={22} height={22} />
                </ActionIcon>
              </div>
            </div>
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
