import type { NextPage } from "next";

import { Divider, Image, Stack, Text, Title } from "@mantine/core";

const Portfolio: NextPage = () => {
  return (
    <Stack spacing={24} px={16} py={40}>
      <Title order={2}>Portfolio</Title>
      <Divider />
      {[...Array(10)].map((_, index) => {
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
            <Text size="xs" weight={700} color="dimmed">
              2021.10 - 2021.12
            </Text>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default Portfolio;
