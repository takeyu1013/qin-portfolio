import type { NextApiRequest, NextApiResponse } from "next";
import type { WriteApiRequestResult } from "microcms-js-sdk";

import type { Contact } from "src/pages/contact";

import { client } from "src/lib/client";

const isNotNullish = (data: unknown): data is Record<string, unknown> => {
  return data != null;
};

const isContact = (contact: unknown): contact is Contact => {
  if (!isNotNullish(contact)) {
    return false;
  }
  return (
    typeof contact.email === "string" &&
    typeof contact.name === "string" &&
    typeof contact.message === "string"
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
