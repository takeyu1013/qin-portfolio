import type { FC } from "react";
import type { GetStaticProps, NextPage } from "next";
import type { MicroCMSListResponse } from "microcms-js-sdk";

import type { Blog } from "src/components/blogs";
import type { Portfolio } from "src/components/portfolios";

import Link from "next/link";
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
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconGitFork, IconStar } from "@tabler/icons";

import { Button } from "src/lib/mantine/Button";
import { Blogs } from "src/components/blogs";
import { Portfolios } from "src/components/portfolios";
import { useMediaQuery } from "src/lib/mantine";
import { client } from "src/lib/client";

export type Props = {
  blogs: MicroCMSListResponse<Blog>;
  portfolios: MicroCMSListResponse<Portfolio>;
};

const Cover: FC = () => {
  return (
    <>
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
    </>
  );
};

const Home: NextPage<Props> = ({ blogs, portfolios }) => {
  const { colors } = useMantineTheme();
  const largerThanXs = useMediaQuery("sm");
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Stack pb={40} spacing={largerThanXs ? 80 : 40}>
      <Group
        position="center"
        grow
        style={{ backgroundColor: colors.pink[6] }}
        className="h-64"
      >
        {largerThanXs ? (
          <Group position="apart" px={16} className="max-w-5xl">
            <Cover />
          </Group>
        ) : (
          <Stack spacing={30} px={16}>
            <Cover />
          </Stack>
        )}
      </Group>
      <Group position="center" grow>
        <Stack spacing={24} px={16} className="max-w-5xl">
          <Title order={2}>Blog</Title>
          <Divider />
          <Blogs size={3} contents={blogs.contents} />
          <Center pb={21}>
            <Link href="/blog">
              <Button
                color="dark"
                variant={dark ? "white" : "filled"}
                radius="xl"
                component="a"
              >
                View All
              </Button>
            </Link>
          </Center>
        </Stack>
      </Group>
      <Group position="center" grow>
        <Stack spacing={24} px={16} className="max-w-5xl">
          <Title order={2}>Portfolio</Title>
          <Divider />
          <SimpleGrid spacing={24} breakpoints={[{ minWidth: "sm", cols: 3 }]}>
            <Portfolios
              size={largerThanXs ? 6 : 3}
              contents={portfolios.contents}
            />
          </SimpleGrid>
          <Center pb={21}>
            <Link href="/portfolio">
              <Button
                color="dark"
                variant={dark ? "white" : "filled"}
                radius="xl"
                component="a"
              >
                View All
              </Button>
            </Link>
          </Center>
        </Stack>
      </Group>
      <Group position="center">
        <SimpleGrid
          breakpoints={[{ minWidth: "sm", cols: 2 }]}
          className="max-w-5xl flex-auto"
        >
          <Stack px={16} spacing={24}>
            <Title order={2}>GitHub</Title>
            <Divider />
            {[...Array(largerThanXs ? 5 : 3)].map((_, index) => {
              return (
                <Stack key={index} py={8} spacing={8}>
                  <Title order={4}>lightsound/nexst-tailwind</Title>
                  <Text>Next.js starter template.</Text>
                  <Group spacing={16}>
                    <Group spacing={4}>
                      <IconStar size={18} color={colors.dark[2]} />
                      <Text size="xs" color={colors.dark[2]} weight={700}>
                        {117}
                      </Text>
                    </Group>
                    <Group spacing={4}>
                      <IconGitFork size={18} color={colors.dark[2]} />
                      <Text size="xs" color={colors.dark[2]} weight={700}>
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
                      <Text size="xs" color={colors.dark[2]} weight={700}>
                        {65.5}%
                      </Text>
                    </Group>
                    <Group spacing={6}>
                      <ColorSwatch color="#F1E05A" size={6} />
                      <Text size="xs" weight={700}>
                        JavaScript
                      </Text>
                      <Text size="xs" color={colors.dark[2]} weight={700}>
                        {33.7}%
                      </Text>
                    </Group>
                    <Group spacing={6}>
                      <ColorSwatch color="#EDEDED" size={6} />
                      <Text size="xs" weight={700}>
                        Other
                      </Text>
                      <Text size="xs" color={colors.dark[2]} weight={700}>
                        {0.8}%
                      </Text>
                    </Group>
                  </Group>
                </Stack>
              );
            })}
            <Center>
              <Button
                color="dark"
                variant={dark ? "white" : "filled"}
                radius="xl"
              >
                View on GitHub
              </Button>
            </Center>
          </Stack>
          <Stack px={16} spacing={24}>
            <Title order={2}>Twitter</Title>
            <Divider />
            {[...Array(3)].map((_, index) => {
              return (
                <Group key={index} py={16} noWrap className="items-start">
                  <Avatar size={38} />
                  <Stack spacing={4}>
                    <Group spacing={8}>
                      <Title order={5}>しまぶーのIT大学</Title>
                      <Text size="xs" color={colors.dark[2]} weight={700}>
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
              <Button
                color="dark"
                variant={dark ? "white" : "filled"}
                radius="xl"
              >
                View on Twitter
              </Button>
            </Center>
          </Stack>
        </SimpleGrid>
      </Group>
    </Stack>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const blogs = await client.getList<Blog>({ endpoint: "blog" });
  const portfolios = await client.getList<Portfolio>({ endpoint: "portfolio" });

  return {
    props: { blogs, portfolios },
  };
};

export default Home;
