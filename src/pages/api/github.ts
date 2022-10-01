import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "@octokit/graphql-schema";

import { Octokit } from "octokit";

const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse<User["repositories"]["nodes"]>
) => {
  const {
    user: {
      repositories: { nodes },
    },
  } = await new Octokit({
    auth: process.env.GITHUB_TOKEN,
  }).graphql<{ user: User }>(`#graphql
    {
      user(login: "takeyu1013") {
        repositories(first: 5, privacy: PUBLIC, orderBy: {field: PUSHED_AT, direction: DESC}) {
          nodes {
            nameWithOwner
            description
            stargazerCount
            forkCount
            languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
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

  res.status(200).json(nodes);
};

export default handler;
