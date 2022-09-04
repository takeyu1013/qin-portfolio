import type { FC, ReactNode } from "react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { MicroCMSListResponse } from "microcms-js-sdk";

import type { Blog } from "src/components/blogs";

import { useRouter } from "next/router";
import {
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
import useSWR from "swr";
import dayjs from "dayjs";

import { useMediaQuery } from "src/lib/mantine";
import { client } from "src/lib/client";

type Props = MicroCMSListResponse<Blog>["contents"][number];

const Outer: FC<{ children: ReactNode }> = ({ children }) => {
  const largerThanXs = useMediaQuery("sm");

  return (
    <Group position="center" grow>
      <Stack
        spacing={24}
        px={16}
        py={40}
        className="max-w-5xl"
        style={{ minHeight: largerThanXs ? 926 : 596 }}
      >
        {children}
      </Stack>
    </Group>
  );
};

const BlogId: NextPage<Props> = (fallbackData) => {
  const { colors } = useMantineTheme();
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<Props>(
    typeof id === "string" ? `/api/blog/${id}` : null,
    async (url) => (await fetch(url)).json(),
    { fallbackData }
  );

  if (!data || router.isFallback) {
    return (
      <Outer>
        <Center>
          <Loader color={colors.pink[6]} />
        </Center>
      </Outer>
    );
  }
  const { title, body, publishedAt } = data;

  return (
    <Outer>
      <Title order={2}>{title}</Title>
      <Divider />
      <Stack spacing={8}>
        <Text
          component="time"
          dateTime={publishedAt}
          size="xs"
          weight={700}
          color={colors.dark[2]}
        >
          {dayjs(publishedAt).format("YYYY.MM.DD")}
        </Text>
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </TypographyStylesProvider>
      </Stack>
    </Outer>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await client.getList({ endpoint: "blog" })).contents.map(
    (content) => `/blog/${content.id}`
  );

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({
  params,
}) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  try {
    const props = await client.getListDetail<Blog>({
      endpoint: "blog",
      contentId: params.id,
    });

    return {
      props,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default BlogId;
