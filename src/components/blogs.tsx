import {
  Center,
  Divider,
  Loader,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
  useMantineTheme,
} from "@mantine/core";
import { FC } from "react";
import { Props } from "src/pages";

export const Blogs: FC<{
  size: number;
  isLoading?: boolean;
  contents: Props["contents"];
}> = ({ size, isLoading, contents }) => {
  const { colors } = useMantineTheme();

  return (
    <Stack spacing={24} px={16} py={0} className="max-w-5xl flex-auto">
      <Title order={2}>Blog</Title>
      <Divider />
      {contents.slice(0, size).map(({ id, title, body, publishedAt }) => {
        const date = new Date(publishedAt || "");
        return (
          <Stack key={id} spacing={8}>
            <Title order={3}>{title}</Title>
            <Text lineClamp={2}>
              <TypographyStylesProvider>
                <div dangerouslySetInnerHTML={{ __html: body }} />
              </TypographyStylesProvider>
            </Text>
            <Text
              size="xs"
              weight={700}
              color={colors.dark[2]}
            >{`${date.getFullYear()}.${
              date.getMonth() + 1
            }.${date.getDate()}`}</Text>
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
