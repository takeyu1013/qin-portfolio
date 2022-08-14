import type { NextPage } from "next";

import { Divider, Stack, Text, Title } from "@mantine/core";

const Blog: NextPage = () => {
  return (
    <Stack spacing={24} px={16} py={40}>
      <Title order={2}>Blog</Title>
      <Divider />
      {[...Array(10)].map((_, index) => {
        return (
          <Stack key={index} spacing={8}>
            <Title order={3}>This is a header</Title>
            <Text lineClamp={2}>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </Text>
            <Text size="xs" weight={700} color="dimmed">
              2022.7.11
            </Text>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default Blog;
