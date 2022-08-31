import type { NextApiRequest, NextApiResponse } from "next";
import type { WriteApiRequestResult } from "microcms-js-sdk";

import type { Contact } from "src/pages/contact";

import { client } from "src/lib/client";

const isContact = (contact: any): contact is Contact => {
  return (
    contact.email !== undefined &&
    contact.name !== undefined &&
    contact.message !== undefined
  );
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<WriteApiRequestResult>
) => {
  const content = req.body;
  if (!isContact(content)) {
    return;
  }
  res
    .status(201)
    .json(await client.create<Contact>({ endpoint: "contact", content }));
};

export default handler;
