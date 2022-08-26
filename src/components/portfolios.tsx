import {
  Anchor,
  Box,
  Divider,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import dayjs from "dayjs";
import { FC } from "react";
import { Props } from "src/pages";

export const Portfolios: FC<{
  size: number;
  contents: Props["portfolios"]["contents"];
}> = ({ size, contents }) => {
  const { colors } = useMantineTheme();

  return (
    <Stack spacing={24} px={16} py={0} className="max-w-5xl flex-auto">
      <Title order={2}>Portfolio</Title>
      <Divider />
      <SimpleGrid spacing={24} breakpoints={[{ minWidth: "sm", cols: 3 }]}>
        {contents
          .slice(0, size)
          .map(({ id, image, title, link, content, startAt, endAt }) => {
            const { url } = image;

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
      </SimpleGrid>
    </Stack>
  );
};
