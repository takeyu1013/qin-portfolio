import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "qin-portfolio",
  apiKey: process.env.API_KEY,
});
