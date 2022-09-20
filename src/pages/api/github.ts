import type { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const { data } = await octokit.request("GET /users/{username}/repos", {
    username: "takeyu1013",
  });

  res.status(200).json({ data });
};

export default handler;
