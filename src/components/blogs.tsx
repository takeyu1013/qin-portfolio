import {
  Anchor,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
  useMantineTheme,
} from "@mantine/core";
import dayjs from "dayjs";
import { MicroCMSListResponse } from "microcms-js-sdk";
import Link from "next/link";
import { FC } from "react";

export type Blog = {
  title: string;
  body: string;
};

export const Blogs: FC<{
  size: number;
  contents: MicroCMSListResponse<Blog>["contents"];
}> = ({ size, contents }) => {
  const { colors } = useMantineTheme();

  return (
    <Stack spacing={24}>
      {contents.slice(0, size).map(({ id, title, body, publishedAt }) => {
        return (
          <Link key={id} href={`/blog/${id}`} passHref>
            <Anchor component="a" variant="text">
              <Stack spacing={8}>
                <Title order={3}>{title}</Title>
                <Text lineClamp={2}>
                  <TypographyStylesProvider>
                    <div dangerouslySetInnerHTML={{ __html: body }} />
                  </TypographyStylesProvider>
                </Text>
                <Text
                  component="time"
                  dateTime={publishedAt}
                  size="xs"
                  weight={700}
                  color={colors.dark[2]}
                >
                  {dayjs(publishedAt).format("YYYY.MM.DD")}
                </Text>
              </Stack>
            </Anchor>
          </Link>
        );
      })}
    </Stack>
  );
};
