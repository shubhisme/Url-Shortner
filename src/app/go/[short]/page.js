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

  redirect(fullUrl);
}
