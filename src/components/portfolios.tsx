import {
  Anchor,
  Divider,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
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
            const start = new Date(startAt);
            const end = new Date(endAt);

            return (
              <Link key={id} href={link} passHref>
                <Anchor component="a" variant="text">
                  <Stack spacing={8}>
                    <Image
                      src={url}
                      width={358}
                      alt="With default placeholder"
                    />
                    <Title order={3}>{title}</Title>
                    <Text>{content}</Text>
                    <Text
                      size="xs"
                      weight={700}
                      color={colors.dark[2]}
                    >{`${start.getFullYear()}.${
                      start.getMonth() + 1
                    } - ${end.getFullYear()}.${end.getMonth() + 1}`}</Text>
                  </Stack>
                </Anchor>
              </Link>
            );
          })}
      </SimpleGrid>
    </Stack>
  );
};
