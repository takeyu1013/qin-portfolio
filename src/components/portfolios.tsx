import {
  Divider,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { FC } from "react";

export const Portfolios: FC<{ size: number }> = ({ size }) => {
  const { colors } = useMantineTheme();

  return (
    <Stack spacing={24} px={16} py={0} className="max-w-5xl flex-auto">
      <Title order={2}>Portfolio</Title>
      <Divider />
      <SimpleGrid spacing={24} breakpoints={[{ minWidth: "sm", cols: 3 }]}>
        {[...Array(size)].map((_, index) => {
          return (
            <Stack key={index} spacing={8}>
              <Image
                width={358}
                height={184}
                alt="With default placeholder"
                withPlaceholder
              />
              <Title order={3}>IT KINGDOM</Title>
              <Text>
                当サロンのLPページ。React、Next.js、TypeScriptなどのモダンな技術を用いて作られています。初心者にちょうど良い難易度の制作物です。
              </Text>
              <Text size="xs" weight={700} color={colors.dark[2]}>
                2021.10 - 2021.12
              </Text>
            </Stack>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
};
