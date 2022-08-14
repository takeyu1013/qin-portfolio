import type { NextPage } from "next";

import Image from "next/image";
import {
  Box,
  Center,
  ColorSwatch,
  Container,
  Divider,
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "src/lib/mantine";
import { Button } from "../lib/mantine/Button";
import { IconGitFork, IconStar } from "@tabler/icons";

const Home: NextPage = () => {
  const theme = useMantineTheme();
  const largerThanXs = useMediaQuery("sm");

  return (
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
        <Stack px={16}>
          <Title order={2}>GitHub</Title>
          <Divider />
          {[...Array(3)].map((_, index) => {
            return (
              <Stack key={index} spacing={8}>
                <Title order={4}>lightsound/nexst-tailwind</Title>
                <Text>Next.js starter template.</Text>
                <Group spacing={16}>
                  <Group spacing={4}>
                    <IconStar size={18} color={theme.colors.dark[2]} />
                    <Text size="xs" color={theme.colors.dark[2]} weight={700}>
                      {117}
                    </Text>
                  </Group>
                  <Group spacing={4}>
                    <IconGitFork size={18} color={theme.colors.dark[2]} />
                    <Text size="xs" color={theme.colors.dark[2]} weight={700}>
                      {18}
                    </Text>
                  </Group>
                </Group>
                <Progress
                  sections={[
                    { value: 65.5, color: "#3178C6" },
                    { value: 33.7, color: "#F1E05A" },
                    { value: 0.8, color: "#EDEDED" },
                  ]}
                />
                <Group spacing={16}>
                  <Group spacing={6}>
                    <ColorSwatch color="#3178C6" size={6} />
                    <Text size="xs" weight={700}>
                      TypeScript
                    </Text>
                    <Text size="xs" color={theme.colors.dark[2]} weight={700}>
                      {65.5}%
                    </Text>
                  </Group>
                  <Group spacing={6}>
                    <ColorSwatch color="#F1E05A" size={6} />
                    <Text size="xs" weight={700}>
                      JavaScript
                    </Text>
                    <Text size="xs" color={theme.colors.dark[2]} weight={700}>
                      {33.7}%
                    </Text>
                  </Group>
                  <Group spacing={6}>
                    <ColorSwatch color="#EDEDED" size={6} />
                    <Text size="xs" weight={700}>
                      Other
                    </Text>
                    <Text size="xs" color={theme.colors.dark[2]} weight={700}>
                      {0.8}%
                    </Text>
                  </Group>
                </Group>
              </Stack>
            );
          })}
          <Center>
            <Button color="dark" radius="xl">
              View on GitHub
            </Button>
          </Center>
        </Stack>
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
  );
};

export default Home;
