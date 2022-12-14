import type { FC } from "react";
import type { MicroCMSListResponse, MicroCMSImage } from "microcms-js-sdk";

import {
  Anchor,
  Box,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import dayjs from "dayjs";

export type Portfolio = {
  title: string;
  content: string;
  link: string;
  image: MicroCMSImage;
  startAt: string;
  endAt: string;
};

export const Portfolios: FC<{
  size: number;
  contents: MicroCMSListResponse<Portfolio>["contents"];
}> = ({ size, contents }) => {
  const { colors } = useMantineTheme();

  return (
    <>
      {contents
        .slice(0, size)
        .map(({ id, image: { url }, title, link, content, startAt, endAt }) => {
          return (
            <Anchor key={id} href={link} target="_blank" variant="text">
              <Stack spacing={8}>
                <Image src={url} width={358} alt="With default placeholder" />
                <Title order={3}>{title}</Title>
                <Text>{content}</Text>
                <Box>
                  <Text
                    component="time"
                    dateTime={startAt}
                    size="xs"
                    weight={700}
                    color={colors.dark[2]}
                    className="inline"
                  >
                    {dayjs(startAt).format("YYYY.MM")}
                  </Text>
                  <Text
                    size="xs"
                    weight={700}
                    color={colors.dark[2]}
                    className="inline"
                  >
                    {" "}
                    -{" "}
                  </Text>
                  <Text
                    component="time"
                    dateTime={endAt}
                    size="xs"
                    weight={700}
                    color={colors.dark[2]}
                    className="inline"
                  >
                    {endAt && dayjs(endAt).format("YYYY.MM")}
                  </Text>
                </Box>
              </Stack>
            </Anchor>
          );
        })}
    </>
  );
};
