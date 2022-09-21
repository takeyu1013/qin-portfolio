import type { NextApiRequest, NextApiResponse } from "next";
import type { Endpoints } from "@octokit/types";

import { Octokit } from "octokit";

const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse<
    (Endpoints["GET /users/{username}/repos"]["response"]["data"][number] & {
      languages: Endpoints["GET /repos/{owner}/{repo}/languages"]["response"]["data"];
    })[]
  >
) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const { data } = await octokit.request("GET /users/{username}/repos", {
    username: "takeyu1013",
  });

  const repos = await Promise.all(
    data.map(async (repo) => {
      const { data } = await octokit.request(
        "GET /repos/{owner}/{repo}/languages",
        { owner: "takeyu1013", repo: repo.name }
      );
      return { ...repo, languages: data };
    })
  );
  console.log(repos);

  res.status(200).json(repos);
};

export default handler;
