import { Box } from "@mantine/core";
import { MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticProps, NextPage } from "next";

import { Portfolios } from "src/components/portfolios";
import { client } from "src/lib/client";
import { Portfolio } from "src/pages";

type Props = MicroCMSListResponse<Portfolio>;

const Portfolio: NextPage<Props> = ({ contents }) => {
  return (
    <Box py={40} className="flex justify-center">
      <Portfolios size={10} contents={contents} />
    </Box>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.getList<Portfolio>({ endpoint: "portfolio" });
  return {
    props: data,
  };
};

export default Portfolio;
