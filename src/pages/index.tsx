import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Center,
  CloseButton,
  Container,
  Divider,
  Footer,
  Header,
  List,
  MediaQuery,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useMediaQuery } from "src/lib/mantine";
import { Button } from "../lib/mantine/Button";

const Home: NextPage = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const largerThanXs = useMediaQuery("sm");

  return (
    <div>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
            padding: 0,
            display: "flex",
          },
        }}
        navbarOffsetBreakpoint="sm"
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
                    <a>About</a>
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
                Takeyu IT University
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
      >
        <Stack spacing={40} className="w-full">
          <Box
            className="h-64 py-14 sm:py-20"
            style={{ backgroundColor: theme.colors.pink[6] }}
          >
            <SimpleGrid
              breakpoints={[
                { minWidth: "xs", cols: 1 },
                { minWidth: "sm", cols: 2 },
              ]}
              className="m-auto max-w-5xl justify-between"
            >
              <Container size="xs" className="m-0 sm:p-0">
                <Title order={2} className="text-white">
                  Takeyu IT University
                </Title>
                <Text size="md" className="text-white">
                  たけゆのポートフォリオのためのページです
                </Text>
              </Container>
              <Box className={`p-4 ${largerThanXs ? "ml-auto" : ""}`}>
                <SimpleGrid cols={3} className="w-24">
                  <Image src="/twitter.svg" width={25} height={25} />
                  <Image src="/facebook.svg" width={25} height={25} />
                  <Image src="/rss.svg" width={25} height={25} />
                </SimpleGrid>
              </Box>
            </SimpleGrid>
          </Box>
          <Stack className="mx-auto max-w-5xl">
            <Container m={0} className="w-screen">
              <Title order={2}>Blog</Title>
              <Divider my="lg" />
              <Container p={0}>This is a header</Container>
            </Container>
            <Container m={0}>
              <Title order={2}>Portfolio</Title>
              <Divider my="lg" />
              <Container p={0}>IT KINGDOM</Container>
              <Center>
                <Button color="dark" radius="xl">
                  View All
                </Button>
              </Center>
            </Container>
            <Container m={0}>
              <Title order={2}>GitHub</Title>
              <Divider my="lg" />
              <Container p={0}>This is a GitHub content</Container>
              <Center>
                <Button color="dark" radius="xl">
                  View on GitHub
                </Button>
              </Center>
            </Container>
            <Container m={0}>
              <Title order={2}>Twitter</Title>
              <Divider my="lg" />
              <Container p={0}>This is a Twitter content</Container>
              <Center>
                <Button color="dark" radius="xl">
                  View on Twitter
                </Button>
              </Center>
            </Container>
          </Stack>
        </Stack>
      </AppShell>
    </div>
  );
};

export default Home;
