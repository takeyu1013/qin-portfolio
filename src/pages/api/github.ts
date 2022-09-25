import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "@octokit/graphql-schema";

import { Octokit } from "octokit";

const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse<User["repositories"]["nodes"]>
) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  const { user } = await octokit.graphql<{ user: User }>(`
    {
      user(login: "takeyu1013") {
        repositories(first: 5) {
          nodes {
            nameWithOwner
            description
            stargazerCount
            forkCount
            languages(first: 5) {
              edges {
                size
                node {
                  name
                  color
                }
              }
              totalSize
            }
          }
        }
      }
    }
  `);
  const { repositories } = user;
  const { nodes } = repositories;

  res.status(200).json(nodes);
};

export default handler;
