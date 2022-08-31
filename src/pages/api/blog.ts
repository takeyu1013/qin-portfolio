import type { NextApiRequest, NextApiResponse } from "next";
import type { MicroCMSListResponse } from "microcms-js-sdk";

import type { Blog } from "src/components/blogs";

import { client } from "src/lib/client";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<MicroCMSListResponse<Blog>>
) => {
  res.status(200).json(
    await client.getList<Blog>({
      endpoint: "blog",
      queries: { offset: Number(req.query.offset) || 0 },
    })
  );
};

export default handler;
