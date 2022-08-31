import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { MicroCMSListResponse } from "microcms-js-sdk";

import type { Blog } from "src/components/blogs";

import {
  Box,
  Divider,
  Group,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
  useMantineTheme,
} from "@mantine/core";
import dayjs from "dayjs";

import { useMediaQuery } from "src/lib/mantine";
import { client } from "src/lib/client";

type Props = MicroCMSListResponse<Blog>["contents"][number];

const BlogId: NextPage<Props> = ({ title, body, publishedAt }) => {
  const { colors } = useMantineTheme();
  const largerThanXs = useMediaQuery("sm");

  return (
    <Group position="center" grow>
      <Box
        px={16}
        py={40}
        className="max-w-5xl"
        style={{ minHeight: largerThanXs ? 926 : 596 }}
      >
        <Stack spacing={20}>
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
      </Box>
    </Group>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.getList({ endpoint: "blog" });
  const paths = data.contents.map((content) => `/blog/${content.id}`);

  return {
    paths,
    fallback: false,
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
  return {
    props: await client.getListDetail<Blog>({
      endpoint: "blog",
      contentId: params.id,
    }),
  };
};

export default BlogId;
