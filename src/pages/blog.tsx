import { Box, Group } from "@mantine/core";
import { MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticProps, NextPage } from "next";

import { Blogs } from "src/components/blogs";
import { client } from "src/lib/client";
import { useMediaQuery } from "src/lib/mantine";
import { Blog } from "src/pages";

type Props = MicroCMSListResponse<Blog>;

const Blog: NextPage<Props> = ({ contents }) => {
  const largerThanXs = useMediaQuery("sm");

  return (
    <Group position="center" grow>
      <Box
        px={16}
        py={40}
        className="max-w-5xl"
        style={{ minHeight: largerThanXs ? 638 : 596 }}
      >
        <Blogs size={10} isLoading contents={contents} />
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
