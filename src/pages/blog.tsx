import { Box } from "@mantine/core";
import type { GetStaticProps, NextPage } from "next";

import { Blogs } from "src/components/blogs";
import { client } from "src/lib/client";
import { Blog, Props } from "src/pages";

const Blog: NextPage<Props> = ({ contents }) => {
  return (
    <Box py={40} className="flex justify-center">
      <Blogs size={10} isLoading contents={contents} />
    </Box>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.getList<Blog>({ endpoint: "blog" });
  return {
    props: data,
  };
};

export default Blog;
