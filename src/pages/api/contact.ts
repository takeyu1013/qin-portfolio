import { WriteApiRequestResult } from "microcms-js-sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "src/lib/client";

type Contact = {
  email: string;
  name: string;
  message: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<WriteApiRequestResult>
) => {
  console.log(req.body);
  const content = req.body;
  const data = await client.create<Contact>({ endpoint: "contact", content });
  res.status(201).json(data);
};

export default handler;
