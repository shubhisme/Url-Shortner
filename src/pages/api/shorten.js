import { redis } from "../../../lib/redis";

export default async function handler(req, res) {
  // get longUrl from body
  const { longUrl } = req.body;
  if (!longUrl || longUrl.length <= 0) {
    res.status(400).json({ status: "error: url not set" });
    return;
  }

  // generate short Url
  const shortUrl = makeShortUrl(4);

  //save it to redis
  let result = await redis.hset("links", { [shortUrl]: longUrl });
  res.status(200).json({ status: "Success!" });
}

const makeShortUrl = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabckefghijklmnopqrstuvwxyz1234567890";

  var charLen = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charLen));
  }
  return result;
};
