// import { redis } from "../../../../lib/redis";
// import { NextResponse } from "next/server";

// export default async function midlewear(req) {
//   // get short url
//   const pathname = req.nextUrl.pathname;
//   let parts = pathname.split("/");
//   let shortUrl = parts[parts.length - 1];

//   // load long url from redis for short url
//   const longUrl = await redis.hget("links", shortUrl);
//   if (longUrl) {
//     // short url found
//     const validUrl = getValidUrl(longUrl);

//     return NextResponse.redirect(validUrl);
//   } else {
//     // not found
//     return NextResponse.redirect(req.nextUrl.origin);
//   }
// }

// const getValidUrl = (link) => {
//   if (link.indexOf("http://") == 0 || link.indexOf("https://") == 0) {
//     return link;
//   } else {
//     return `http://${link}`;
//   }
// };

import { redirect } from "next/navigation";
import { redis } from "../../../../lib/redis";

export default async function RedirectPage({ params }) {
  const { short } = params;

  const longUrl = await redis.hget("links", short);

  if (!longUrl) {
    // fallback to homepage or 404
    redirect("/");
  }

  const isValid =
    longUrl.startsWith("http://") || longUrl.startsWith("https://");
  const fullUrl = isValid ? longUrl : `http://${longUrl}`;

  redirect(fullUrl); // 🚀 redirect to original URL
}
