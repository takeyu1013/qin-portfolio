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
import useInfiniteScroll from "react-infinite-scroll-hook";

type Props = MicroCMSListResponse<Blog>;

const getKey: SWRInfiniteKeyLoader = (index, previousPageData: Props) => {
  if (previousPageData && !previousPageData.contents.length) {
    return null;
  }
  return `/api/blog?offset=${index * 10}`;
};

const Blog: NextPage<Props> = ({ contents }) => {
  const largerThanXs = useMediaQuery("sm");
  const { data, size, setSize, error } = useSWRInfinite<
    MicroCMSListResponse<Blog>
  >(getKey, async (url) => (await fetch(url)).json());
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
        {data ? (
          <Stack spacing={24}>
            <Title order={2}>Blog</Title>
            <Divider />
            {data.map(({ contents }) => {
              return contents.map(({ id, title, body, publishedAt }) => {
                return (
                  <Link key={id} href={`/blog/${id}`} passHref>
                    <Anchor component="a" variant="text">
                      <Stack spacing={8}>
                        <Title order={3}>{title}</Title>
                        <Text lineClamp={2}>
                          <TypographyStylesProvider>
                            <div dangerouslySetInnerHTML={{ __html: body }} />
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
              });
            })}
          </Stack>
        ) : (
          <Blogs size={10} contents={contents} />
        )}
        {(loading || hasNextPage) && (
          <Center ref={sentryRef}>
            <Loader color={colors.pink[6]} />
          </Center>
        )}
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
