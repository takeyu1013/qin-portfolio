import type { GetStaticProps, NextPage } from "next";
import type { MicroCMSListResponse } from "microcms-js-sdk";

import type { Portfolio } from "src/components/portfolios";

import {
  Center,
  Divider,
  Group,
  Loader,
  SimpleGrid,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import useSWRInfinite from "swr/infinite";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { Portfolios } from "src/components/portfolios";
import { useMediaQuery } from "src/lib/mantine";
import { client } from "src/lib/client";

type Props = MicroCMSListResponse<Portfolio>;

const Portfolio: NextPage<Props> = (props) => {
  const largerThanXs = useMediaQuery("sm");
  const { colors } = useMantineTheme();
  const { data, size, setSize, error } = useSWRInfinite<
    MicroCMSListResponse<Portfolio>
  >(
    (index, previousPageData) => {
      if (previousPageData && !previousPageData.contents.length) {
        return null;
      }
      return `/api/portfolio?offset=${index * 10}`;
    },
    async (url) => (await fetch(url)).json(),
    { fallbackData: [props] }
  );
  const loading = !error && !data;
  const hasNextPage = data === undefined || size * 10 < data[0].totalCount;
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => {
      setSize(size + 1);
    },
    disabled: !!error,
  });

  return (
    <Group position="center" grow>
      <Stack
        spacing={24}
        px={16}
        py={40}
        className="max-w-5xl"
        style={{ minHeight: largerThanXs ? 638 : 596 }}
      >
        <Title order={2}>Portfolio</Title>
        <Divider />
        {data ? (
          <>
            <SimpleGrid
              spacing={24}
              breakpoints={[{ minWidth: "sm", cols: 3 }]}
            >
              {data.map(({ contents }, index) => {
                return (
                  <Portfolios
                    key={index}
                    size={contents.length}
                    contents={contents}
                  />
                );
              })}
            </SimpleGrid>
            {(loading || hasNextPage) && (
              <Center ref={sentryRef}>
                <Loader color={colors.pink[6]} />
              </Center>
            )}
          </>
        ) : (
          <Center>
            <Loader color={colors.pink[6]} />
          </Center>
        )}
      </Stack>
    </Group>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const props = await client.getList<Portfolio>({ endpoint: "portfolio" });

  return {
    props,
  };
};

export default Portfolio;
