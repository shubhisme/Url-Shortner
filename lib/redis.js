import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://clean-mouse-17999.upstash.io",
  token: "AUZPAAIjcDE3NTNiZjk2MTZmYTc0MDY2YTQxZDdiNDJhMjIzNzg3YXAxMA",
});

await redis.set("foo", "bar");
await redis.get("foo");
