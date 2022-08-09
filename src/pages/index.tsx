import {
  ActionIcon,
  AppShell,
  Aside,
  Box,
  Burger,
  Center,
  Container,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../lib/mantine/Button";

const Home: NextPage = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

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
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Text>Takeyu IT University</Text>
          </Navbar>
        }
        aside={
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
              <Text>Application sidebar</Text>
            </Aside>
          </MediaQuery>
        }
        footer={
          <Footer height={60} p="md">
            Application footer
          </Footer>
        }
        header={
          <Header height={65} p="md">
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Text size="lg" weight={700} className="mx-auto">
                Takeyu IT University
              </Text>
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
          </Header>
        }
      >
        <Stack spacing={40}>
          <Box
            className="h-64 py-14"
            style={{ backgroundColor: theme.colors.pink[6] }}
          >
            <Container size="xs">
              <Title order={2} className="text-white">
                Takeyu IT University
              </Title>
              <Text size="md" className="text-white">
                たけゆのポートフォリオのためのページです
              </Text>
            </Container>
          </Box>
          <Container m={0}>
            <Title order={2}>Blog</Title>
            <Container p={0}>This is a header</Container>
          </Container>
          <Container m={0}>
            <Title order={2}>Portfolio</Title>
            <Container p={0}>IT KINGDOM</Container>
            <Center>
              <Button color="dark" radius="xl">
                View All
              </Button>
            </Center>
          </Container>
          <Container m={0}>
            <Title order={2}>GitHub</Title>
            <Container p={0}>This is a GitHub content</Container>
            <Center>
              <Button color="dark" radius="xl">
                View on GitHub
              </Button>
            </Center>
          </Container>
          <Container m={0}>
            <Title order={2}>Twitter</Title>
            <Container p={0}>This is a Twitter content</Container>
            <Center>
              <Button color="dark" radius="xl">
                View on Twitter
              </Button>
            </Center>
          </Container>
        </Stack>
      </AppShell>
    </div>
  );
};

export default Home;
