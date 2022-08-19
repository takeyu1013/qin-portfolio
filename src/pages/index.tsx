import type { NextPage } from "next";

import Image from "next/image";
import {
  Avatar,
  Box,
  Center,
  ColorSwatch,
  Divider,
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
  useMantineTheme,
} from "@mantine/core";
import { IconGitFork, IconStar } from "@tabler/icons";

import { Button } from "src/lib/mantine/Button";
import { Blogs } from "src/components/blogs";
import { Portfolios } from "src/components/portfolios";
import { useMediaQuery } from "src/lib/mantine";

const Home: NextPage = () => {
  const theme = useMantineTheme();
  const largerThanXs = useMediaQuery("sm");

  return (
    <Stack pb={40} spacing={40}>
      <SimpleGrid
        px={16}
        style={{ backgroundColor: theme.colors.pink[6] }}
        className={`h-64 items-center ${largerThanXs && "flex justify-center"}`}
      >
        <SimpleGrid
          className={
            largerThanXs ? "flex max-w-5xl flex-auto justify-between" : ""
          }
          px={largerThanXs ? 16 : 0}
        >
          <Box>
            <Title order={2} className="text-white">
              Takeyu IT University
            </Title>
            <Text size="md" className="text-white">
              たけゆのポートフォリオのためのページです
            </Text>
          </Box>
          <Group>
            <Image src="/twitter.svg" alt="twitter" width={25} height={25} />
            <Image src="/facebook.svg" alt="facebook" width={25} height={25} />
            <Image src="/rss.svg" alt="rss" width={25} height={25} />
          </Group>
        </SimpleGrid>
      </SimpleGrid>
      <Group position="center">
        <Stack spacing={24} className="max-w-5xl flex-auto">
          <Blogs size={3} />
          <Center pb={21}>
            <Button color="dark" radius="xl">
              View All
            </Button>
          </Center>
        </Stack>
      </Group>
      <Group position="center">
        <Stack spacing={24} className="max-w-5xl flex-auto">
          <Portfolios size={3} />
          <Center pb={21}>
            <Button color="dark" radius="xl">
              View All
            </Button>
          </Center>
        </Stack>
      </Group>
      <Group position="center">
        <SimpleGrid
          breakpoints={[{ minWidth: "sm", cols: 2 }]}
          className="max-w-5xl flex-auto"
        >
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
          <Stack px={16}>
            <Title order={2}>Twitter</Title>
            <Divider />
            {[...Array(3)].map((_, index) => {
              return (
                <Group key={index} py={16} noWrap className="items-start">
                  <Avatar size={38} />
                  <Stack spacing={4}>
                    <Group spacing={8}>
                      <Title order={5}>しまぶーのIT大学</Title>
                      <Text size="xs" color={theme.colors.dark[2]} weight={700}>
                        @shimabu_it・5月25日
                      </Text>
                    </Group>
                    <TypographyStylesProvider>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            "<p>📣 新サービス「Noway Form」をリリースしました！</p><p>Noway Formは、Notionのデータベースをもとにフォームを作成できるサービスです。これまでGoogle FormsでやっていたことがNotionだけで完結します✌✨</p><p>試しに使っていただけると幸いです😊</p><p><a>https://www.noway-form.com/ja</a></p>",
                        }}
                      />
                    </TypographyStylesProvider>
                  </Stack>
                </Group>
              );
            })}
            <Center>
              <Button color="dark" radius="xl">
                View on Twitter
              </Button>
            </Center>
          </Stack>
        </SimpleGrid>
      </Group>
    </Stack>
  );
};

export default Home;
