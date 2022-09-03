import type { NextApiRequest, NextApiResponse } from "next";
import type { MicroCMSListResponse } from "microcms-js-sdk";

import type { Blog } from "src/components/blogs";

import { client } from "src/lib/client";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<MicroCMSListResponse<Blog>["contents"][number]>
) => {
  const { id } = req.query;
  if (typeof id !== "string") {
    return;
  }
  res.status(200).json(
    await client.getListDetail<Blog>({
      endpoint: "blog",
      contentId: id,
    })
  );
};

export default handler;
