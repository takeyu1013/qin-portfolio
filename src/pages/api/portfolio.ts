import type { NextApiRequest, NextApiResponse } from "next";
import type { MicroCMSListResponse } from "microcms-js-sdk";

import type { Portfolio } from "src/components/portfolios";

import { client } from "src/lib/client";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<MicroCMSListResponse<Portfolio>>
) => {
  res.status(200).json(
    await client.getList<Portfolio>({
      endpoint: "portfolio",
      queries: { offset: Number(req.query.offset) || 0 },
    })
  );
};

export default handler;
