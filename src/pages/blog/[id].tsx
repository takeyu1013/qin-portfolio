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
import dayjs from "dayjs";

import { useMediaQuery } from "src/lib/mantine";
import { client } from "src/lib/client";
import useSWR from "swr";

type Props = MicroCMSListResponse<Blog>["contents"][number];

const BlogId: NextPage<Props> = (props) => {
  const { colors } = useMantineTheme();
  const largerThanXs = useMediaQuery("sm");
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<Props>(
    id ? `/api/blog/${id}` : null,
    async (url) => (await fetch(url)).json(),
    { fallbackData: props }
  );

  if (!data || !data.id) {
    return (
      <Group position="center" grow>
        <Stack
          px={16}
          py={40}
          className="max-w-5xl"
          style={{ minHeight: largerThanXs ? 926 : 596 }}
        >
          <Center>
            <Loader color={colors.pink[6]} />
          </Center>
        </Stack>
      </Group>
    );
  }
  const { title, body, publishedAt } = data;

  return (
    <Group position="center" grow>
      <Stack
        spacing={20}
        px={16}
        py={40}
        className="max-w-5xl"
        style={{ minHeight: largerThanXs ? 926 : 596 }}
      >
        <Title order={2} className="leading-10">
          {title}
        </Title>
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
      </Stack>
    </Group>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.getList({ endpoint: "blog" });
  const paths = data.contents.map((content) => `/blog/${content.id}`);

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
    return {
      props: await client.getListDetail<Blog>({
        endpoint: "blog",
        contentId: params.id,
      }),
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default BlogId;
