import type { NextPage } from "next";

import Image from "next/image";
import {
  Box,
  Center,
  Container,
  Divider,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "src/lib/mantine";
import { Button } from "../lib/mantine/Button";

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
