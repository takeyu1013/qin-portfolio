import type { GetStaticProps, NextPage } from "next";
import type { MicroCMSListResponse } from "microcms-js-sdk";

import type { Blog } from "src/components/blogs";

import {
  Box,
  Center,
  Divider,
  Group,
  Loader,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import useSWRInfinite from "swr/infinite";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { Blogs } from "src/components/blogs";
import { client } from "src/lib/client";
import { useMediaQuery } from "src/lib/mantine";

type Props = MicroCMSListResponse<Blog>;

const Blog: NextPage<Props> = ({ contents }) => {
  const largerThanXs = useMediaQuery("sm");
  const { data, size, setSize, error } = useSWRInfinite<
    MicroCMSListResponse<Blog>
  >(
    (index, previousPageData) => {
      if (previousPageData && !previousPageData.contents.length) {
        return null;
      }
      return `/api/blog?offset=${index * 10}`;
    },
    async (url) => (await fetch(url)).json()
  );
  const loading = !error && !data;
  const hasNextPage = data === undefined || size * 10 < data[0].totalCount;
  const { colors } = useMantineTheme();
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => {
      setSize(size + 1);
    },
    disabled: !!error,
  });

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
            <Stack spacing={24}>
              {data.map(({ contents }, index) => {
                return (
                  <Blogs
                    key={index}
                    size={contents.length}
                    contents={contents}
                  />
                );
              })}
              {(loading || hasNextPage) && (
                <Center ref={sentryRef}>
                  <Loader color={colors.pink[6]} />
                </Center>
              )}
            </Stack>
          ) : (
            <Blogs size={10} contents={contents} />
          )}
        </Stack>
      </Box>
    </Group>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: await client.getList<Blog>({ endpoint: "blog" }),
  };
};

export default Blog;
