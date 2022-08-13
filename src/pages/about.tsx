import type { NextPage } from "next";

import { Divider, Stack, Text, Title } from "@mantine/core";

const About: NextPage = () => {
  return (
    <Stack px={16} py={40}>
      <Title order={2}>About</Title>
      <Divider />
      <Title order={3}>Yuto Takeuchi</Title>
      <Text>
        IT企業のセールスエンジニア。同志社大学大学院理工学研究科情報工学専攻卒。基本情報技術者試験及びAWS
        Certified Solutions Architect - Associate 合格済。
      </Text>
    </Stack>
  );
};

export default About;
