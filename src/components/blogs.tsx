import { Divider, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { FC } from "react";

export const Blogs: FC<{ size: number }> = ({ size }) => {
  const { colors } = useMantineTheme();

  return (
    <Stack spacing={24} px={16} py={0}>
      <Title order={2}>Blog</Title>
      <Divider />
      {[...Array(size)].map((_, index) => {
        return (
          <Stack key={index} spacing={8}>
            <Title order={3}>This is a header</Title>
            <Text lineClamp={2}>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </Text>
            <Text size="xs" weight={700} color={colors.dark[2]}>
              2022.7.11
            </Text>
          </Stack>
        );
      })}
    </Stack>
  );
};
