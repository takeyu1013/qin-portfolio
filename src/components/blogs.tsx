import {
  Center,
  Divider,
  Loader,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { FC } from "react";

export const Blogs: FC<{ size: number; isLoading?: boolean }> = ({
  size,
  isLoading,
}) => {
  const { colors } = useMantineTheme();

  return (
    <Stack spacing={24} px={16} py={0} className="max-w-5xl flex-auto">
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
      {isLoading && (
        <Center>
          <Loader color={colors.pink[6]} />
        </Center>
      )}
    </Stack>
  );
};
