import { Box } from "@mantine/core";
import type { NextPage } from "next";

import { Blogs } from "src/components/blogs";

const Blog: NextPage = () => {
  return (
    <Box py={40} className="flex justify-center">
      <Blogs size={10} />
    </Box>
  );
};

export default Blog;
