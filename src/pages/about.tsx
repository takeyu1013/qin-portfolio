import type { NextPage } from "next";

import { useState } from "react";
import Image from "next/image";
import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  CloseButton,
  Divider,
  Header,
  List,
  MediaQuery,
  Modal,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";

const About: NextPage = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const largerThanXs = useMediaQuery("sm");

  return (
    <AppShell
      navbar={
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            styles={{
              inner: { padding: 0 },
              modal: {
                backgroundColor: theme.colors.pink[6],
              },
              header: { display: "none" },
            }}
            radius={0}
            padding={0}
          >
            <Box p={20}>
              <CloseButton
                size={28}
                variant="filled"
                color="pink"
                onClick={() => setOpened(false)}
              />
            </Box>
            <List
              styles={{
                item: { color: "white", fontWeight: 700, fontSize: 28 },
              }}
              px={24}
              py={20}
              spacing={16}
            >
              <List.Item>
                <Link href="/about" passHref>
                  {/* <Anchor component="a">About</Anchor> */}
                  <a>About</a>
                </Link>
              </List.Item>
              <List.Item>Blog</List.Item>
              <List.Item>Portfolio</List.Item>
              <List.Item>Contact</List.Item>
            </List>
          </Modal>
        </MediaQuery>
      }
      header={
        <Header height={65} p="md" className="flex justify-center">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
            className="w-full max-w-5xl justify-between"
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
              />
            </MediaQuery>
            <Text size="lg" weight={700}>
              Takeyu IT University
            </Text>
            <div className="flex items-center gap-4">
              {largerThanXs ? (
                <>
                  <Text size="lg" weight={700}>
                    About
                  </Text>
                  <Text size="lg" weight={700}>
                    Blog
                  </Text>
                  <Text size="lg" weight={700}>
                    Portfolio
                  </Text>
                  <Text size="lg" weight={700}>
                    Contact
                  </Text>
                </>
              ) : undefined}
              <ActionIcon
                variant="default"
                onClick={() => {}}
                size="lg"
                radius="md"
                className="ml-auto"
              >
                <Image src="/moon.svg" width={22} height={22} />
              </ActionIcon>
            </div>
          </div>
        </Header>
      }
      classNames={{ main: "py-10" }}
    >
      <Stack>
        <Title order={2}>About</Title>
        <Divider />
        <Title order={3}>Yuto Takeuchi</Title>
        <Text>
          IT企業のセールスエンジニア。同志社大学大学院理工学研究科情報工学専攻卒。基本情報技術者試験及びAWS
          Certified Solutions Architect - Associate 合格済。
        </Text>
      </Stack>
    </AppShell>
  );
};

export default About;
