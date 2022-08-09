import {
  ActionIcon,
  AppShell,
  Aside,
  Burger,
  Footer,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Text>Takeyu IT University</Text>
          </Navbar>
        }
        aside={
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
              <Text>Application sidebar</Text>
            </Aside>
          </MediaQuery>
        }
        footer={
          <Footer height={60} p="md">
            Application footer
          </Footer>
        }
        header={
          <Header height={70} p="md">
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Group position="apart">
                <Text>Takeyu IT University</Text>
                <ActionIcon variant="default" onClick={() => {}} size={30}>
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.0001 1.25001C10.1211 1.25001 10.2411 1.25001 10.3603 1.25001C9.1827 2.34424 8.42576 3.81653 8.22107 5.41096C8.01638 7.00539 8.37687 8.62114 9.2399 9.97735C10.1029 11.3336 11.4139 12.3445 12.9449 12.8344C14.476 13.3242 16.1303 13.2621 17.6203 12.6588C17.0471 14.038 16.1104 15.2356 14.9099 16.1241C13.7094 17.0125 12.2903 17.5585 10.8039 17.7036C9.31748 17.8488 7.81954 17.5877 6.46987 16.9483C5.1202 16.3089 3.96941 15.3151 3.14026 14.0729C2.31111 12.8307 1.83471 11.3868 1.76187 9.89507C1.68902 8.40336 2.02247 6.91986 2.72664 5.60281C3.43082 4.28576 4.4793 3.18456 5.76025 2.41668C7.04121 1.6488 8.50658 1.24304 10.0001 1.24268V1.25001Z"
                      stroke="#25262B"
                      stroke-width="1.83333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </ActionIcon>
              </Group>
            </div>
          </Header>
        }
      >
        <Text>Resize app to see responsive navbar in action</Text>
      </AppShell>
    </div>
  );
};

export default Home;
