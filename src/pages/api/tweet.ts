import type { NextApiRequest, NextApiResponse } from "next";
import type {
  TwitterResponse,
  usersIdTweets,
} from "twitter-api-sdk/dist/types";

import { Client } from "twitter-api-sdk";

const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse<{
    user: Exclude<
      Exclude<TwitterResponse<usersIdTweets>["includes"], undefined>["users"],
      undefined
    >[number];
    tweets: (Exclude<
      TwitterResponse<usersIdTweets>["data"],
      undefined
    >[number] & { html: string })[];
  }>
) => {
  const client = new Client(process.env.BEARER_TOKEN);
  const { data, includes } = await client.tweets.usersIdTweets(
    "1199992312815734784",
    {
      expansions: ["author_id"],
      "tweet.fields": ["created_at"],
      "user.fields": ["profile_image_url"],
      exclude: ["replies", "retweets"],
    }
  );
  if (!data) {
    return;
  }
  if (!includes || !includes.users || !includes.users[0]) {
    return;
  }
  const user = includes.users[0];
  const tweets = await Promise.all(
    data.map(async (tweet) => {
      const { id } = tweet;
      if (!includes.users) {
        return { ...tweet, html: "" };
      }
      const data = await fetch(
        `https://publish.twitter.com/oembed?url=https://twitter.com/${includes.users[0].username}/status/${id}`
      );
      const { html } = await data.json();
      if (typeof html !== "string") {
        return { ...tweet, html: "" };
      }
      return { ...tweet, html };
    })
  );
  res.status(200).json({ user, tweets });
};

export default handler;
