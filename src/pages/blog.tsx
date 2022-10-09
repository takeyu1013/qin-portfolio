import type { GetStaticProps, NextPage } from "next";
import type { MicroCMSListResponse } from "microcms-js-sdk";

import type { Blog } from "src/components/blogs";

import {
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
import { useMediaQuery } from "src/lib/mantine";
import { fetcher } from "src/lib/fetcher";
import { client } from "src/lib/client";

type Props = MicroCMSListResponse<Blog>;

const Blog: NextPage<Props> = (props) => {
  const largerThanXs = useMediaQuery("sm");
  const { colors } = useMantineTheme();
  const { data, size, setSize, error, isValidating } = useSWRInfinite<
    MicroCMSListResponse<Blog>
  >(
    (index, previousPageData) => {
      if (previousPageData && !previousPageData.contents.length) {
        return null;
      }
      return `/api/blog?offset=${index * 10}`;
    },
    fetcher,
    { fallbackData: [props] }
  );
  const loading = !error && (!data || isValidating);
  const hasNextPage = !!data && size * 10 < data[0].totalCount;
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
      <Stack
        spacing={24}
        px={16}
        py={40}
        className="max-w-5xl"
        style={{ minHeight: largerThanXs ? 638 : 596 }}
      >
        <Title order={2}>Blog</Title>
        <Divider />
        {data ? (
          <Stack spacing={24}>
            {data.map(({ contents }, index) => {
              return (
                <Blogs key={index} size={contents.length} contents={contents} />
              );
            })}
            {(loading || hasNextPage) && (
              <Center ref={sentryRef}>
                <Loader color={colors.pink[6]} />
              </Center>
            )}
          </Stack>
        ) : (
          <Center>
            <Loader color={colors.pink[6]} />
          </Center>
        )}
      </Stack>
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
