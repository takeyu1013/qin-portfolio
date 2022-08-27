import { MicroCMSListResponse } from "microcms-js-sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "src/lib/client";
import { Blog } from "src/pages";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<MicroCMSListResponse<Blog>>
) => {
  const data = await client.getList<Blog>({
    endpoint: "blog",
    queries: { offset: Number(req.query.offset) },
  });

  res.status(200).json(data);
};

export default handler;
