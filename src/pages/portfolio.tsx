import { Box } from "@mantine/core";
import type { NextPage } from "next";

import { Portfolios } from "src/components/portfolios";

const Portfolio: NextPage = () => {
  return (
    <Box py={40} className="flex justify-center">
      <Portfolios size={10} />
    </Box>
  );
};

export default Portfolio;
