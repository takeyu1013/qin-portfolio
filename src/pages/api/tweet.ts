import type { NextApiRequest, NextApiResponse } from "next";
import type {
  TwitterResponse,
  usersIdTweets,
  findUserByUsername,
} from "twitter-api-sdk/dist/types";

import { Client } from "twitter-api-sdk";

const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse<{
    user: TwitterResponse<findUserByUsername>["data"];
    tweets: (Exclude<
      TwitterResponse<usersIdTweets>["data"],
      undefined
    >[number] & { html: string })[];
  }>
) => {
  const client = new Client(process.env.BEARER_TOKEN);
  const { data: user } = await client.users.findUserByUsername("shimabu_it", {
    "user.fields": ["profile_image_url"],
  });
  if (!user) {
    return;
  }
  const { data: tweets } = await client.tweets.usersIdTweets(user.id, {
    "tweet.fields": ["created_at"],
  });

  if (!tweets) {
    return;
  }
  const embedTweets = await Promise.all(
    tweets.map(async (tweet) => {
      const { id } = tweet;
      const url = `https://publish.twitter.com/oembed?url=https://twitter.com/${user.username}/status/${id}`;
      const data = await fetch(url);
      const { html } = await data.json();
      if (typeof html !== "string") {
        return { ...tweet, html: "" };
      }
      return { ...tweet, html };
    })
  );
  res.status(200).json({ user, tweets: embedTweets });
};

export default handler;
