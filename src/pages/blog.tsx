import {
  Anchor,
  Box,
  Center,
  Divider,
  Group,
  Loader,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
  useMantineTheme,
} from "@mantine/core";
import { MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticProps, NextPage } from "next";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

import { Blogs } from "src/components/blogs";
import { client } from "src/lib/client";
import { useMediaQuery } from "src/lib/mantine";
import { Blog } from "src/pages";
import Link from "next/link";
import dayjs from "dayjs";
import InfiniteScroll from "react-swr-infinite-scroll";

type Props = MicroCMSListResponse<Blog>;

const getKey: SWRInfiniteKeyLoader = (index, previousPageData: Props) => {
  if (previousPageData && !previousPageData.contents.length) {
    return null;
  }
  return `/api/blog?offset=${index * 10}`;
};

const Blog: NextPage<Props> = ({ contents }) => {
  const largerThanXs = useMediaQuery("sm");
  const swr = useSWRInfinite<MicroCMSListResponse<Blog>>(getKey, async (url) =>
    (await fetch(url)).json()
  );
  const { data } = swr;
  const { colors } = useMantineTheme();

  return (
    <Group position="center" grow>
      <Box
        px={16}
        py={40}
        className="max-w-5xl"
        style={{ minHeight: largerThanXs ? 638 : 596 }}
      >
        <Stack spacing={24}>
          <Title order={2}>Blog</Title>
          <Divider />
          {data ? (
            <InfiniteScroll
              swr={swr}
              loadingIndicator={
                <Center>
                  <Loader color={colors.pink[6]} />
                </Center>
              }
              isReachingEnd={({ data, size }) => {
                if (!data) return false;
                return size * 10 > data[0].totalCount;
              }}
            >
              {(response: MicroCMSListResponse<Blog>) => {
                return response.contents.map(
                  ({ id, title, body, publishedAt }) => {
                    return (
                      <Link key={id} href={`/blog/${id}`} passHref>
                        <Anchor component="a" variant="text">
                          <Stack spacing={8}>
                            <Title order={3}>{title}</Title>
                            <Text lineClamp={2}>
                              <TypographyStylesProvider>
                                <div
                                  dangerouslySetInnerHTML={{ __html: body }}
                                />
                              </TypographyStylesProvider>
                            </Text>
                            <Text
                              component="time"
                              dateTime={publishedAt}
                              size="xs"
                              weight={700}
                              color={colors.dark[2]}
                            >
                              {dayjs(publishedAt).format("YYYY.MM.DD")}
                            </Text>
                          </Stack>
                        </Anchor>
                      </Link>
                    );
                  }
                );
              }}
            </InfiniteScroll>
          ) : (
            <Blogs size={10} contents={contents} />
          )}
        </Stack>
      </Box>
    </Group>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const props = await client.getList<Blog>({ endpoint: "blog" });
  return {
    props,
  };
};

export default Blog;
