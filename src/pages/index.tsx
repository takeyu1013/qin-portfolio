import type { FC } from "react";
import type { GetStaticProps, NextPage } from "next";
import type { MicroCMSListResponse } from "microcms-js-sdk";
import type {
  TwitterResponse,
  usersIdTweets,
  findUserByUsername,
} from "twitter-api-sdk/dist/types";
import type { User } from "@octokit/graphql-schema";

import type { Blog } from "src/components/blogs";
import type { Portfolio } from "src/components/portfolios";

import Link from "next/link";
import {
  Anchor,
  Avatar,
  Box,
  Center,
  ColorSwatch,
  Divider,
  Group,
  Loader,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { FaTwitter, FaFacebook, FaRss } from "react-icons/fa";
import { IconGitFork, IconStar } from "@tabler/icons";
import useSWR from "swr";
import dayjs from "dayjs";

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
        <Anchor href="https://twitter.com/takeyu1013" target="_blank">
          <FaTwitter size={25} color="white" />
        </Anchor>
        <Anchor
          href="https://www.facebook.com/yuto.takeuchi.71"
          target="_blank"
        >
          <FaFacebook size={25} color="white" />
        </Anchor>
        <FaRss size={25} color="white" />
      </Group>
    </>
  );
};

const Home: NextPage<Props> = ({ blogs, portfolios }) => {
  const { colors } = useMantineTheme();
  const largerThanXs = useMediaQuery("sm");
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const fetcher = async (url: string) => (await fetch(url)).json();
  const { data } = useSWR<{
    tweets: (Exclude<
      TwitterResponse<usersIdTweets>["data"],
      undefined
    >[number] & { html: string })[];
    user: TwitterResponse<findUserByUsername>["data"];
  }>(`/api/tweet`, fetcher);
  const { data: repos } = useSWR<User["repositories"]["nodes"]>(
    `/api/github`,
    fetcher
  );

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
            {repos ? (
              repos.slice(0, largerThanXs ? 5 : 3).map((repo, index) => {
                if (!repo) {
                  return undefined;
                }
                const {
                  nameWithOwner,
                  description,
                  stargazerCount,
                  forkCount,
                  languages,
                  url,
                } = repo;
                if (!languages) {
                  return undefined;
                }
                const { totalSize, edges } = languages;
                if (!edges) {
                  return undefined;
                }

                return (
                  <Anchor
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="text"
                  >
                    <Stack key={index} py={8} spacing={8}>
                      <Title order={4}>{nameWithOwner}</Title>
                      <Text>{description || "No description"}</Text>
                      <Group spacing={16}>
                        <Group spacing={4}>
                          <IconStar size={18} color={colors.dark[2]} />
                          <Text size="xs" color={colors.dark[2]} weight={700}>
                            {stargazerCount}
                          </Text>
                        </Group>
                        <Group spacing={4}>
                          <IconGitFork size={18} color={colors.dark[2]} />
                          <Text size="xs" color={colors.dark[2]} weight={700}>
                            {forkCount}
                          </Text>
                        </Group>
                      </Group>
                      <Progress
                        sections={edges.map((edge) => {
                          if (!edge) {
                            return { value: 0, color: "" };
                          }
                          const { node, size } = edge;
                          const { color } = node;
                          if (!color) {
                            return {
                              value: (size * 100) / totalSize,
                              color: "",
                            };
                          }
                          return { value: (size * 100) / totalSize, color };
                        })}
                      />
                      <Group spacing={16}>
                        {edges.map((edge, index) => {
                          if (!edge) {
                            return undefined;
                          }
                          const { node, size } = edge;
                          if (!node) {
                            return undefined;
                          }
                          const { name, color } = node;
                          return (
                            <Group key={index} spacing={6}>
                              <ColorSwatch color={color || ""} size={6} />
                              <Text size="xs" weight={700}>
                                {name}
                              </Text>
                              <Text
                                size="xs"
                                color={colors.dark[2]}
                                weight={700}
                              >
                                {((size * 100) / totalSize).toFixed(1)}%
                              </Text>
                            </Group>
                          );
                        })}
                      </Group>
                    </Stack>
                  </Anchor>
                );
              })
            ) : (
              <Center>
                <Loader color={colors.pink[6]} />
              </Center>
            )}
            <Center>
              <Button
                color="dark"
                variant={dark ? "white" : "filled"}
                radius="xl"
                component="a"
                href="https://github.com/takeyu1013"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </Button>
            </Center>
          </Stack>
          <Stack px={16} spacing={24}>
            <Title order={2}>Twitter</Title>
            <Divider />
            {data ? (
              data.tweets.slice(0, 3).map(({ id, created_at, html }, index) => {
                return (
                  <Anchor
                    key={index}
                    href={`https://twitter.com/${data.user?.username}/status/${id}`}
                    variant="text"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Group py={16} noWrap className="items-start">
                      <Avatar
                        size={38}
                        radius="xl"
                        src={data.user?.profile_image_url}
                      />
                      <Stack spacing={4}>
                        <Group spacing={8}>
                          <Title order={5}>{data.user?.name}</Title>
                          <Text size="xs" color={colors.dark[2]} weight={700}>
                            @{data.user?.username}・
                            {dayjs(created_at).format("M月D日")}
                          </Text>
                        </Group>
                        <TypographyStylesProvider>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: html
                                .split(`<blockquote class="twitter-tweet">`)[1]
                                .split("&mdash;")[0],
                            }}
                          />
                        </TypographyStylesProvider>
                      </Stack>
                    </Group>
                  </Anchor>
                );
              })
            ) : (
              <Center>
                <Loader color={colors.pink[6]} />
              </Center>
            )}
            <Center>
              <Button
                color="dark"
                variant={dark ? "white" : "filled"}
                radius="xl"
                component="a"
                href={`https://twitter.com/${data?.user?.username}`}
                target="_blank"
                rel="noopener noreferrer"
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
