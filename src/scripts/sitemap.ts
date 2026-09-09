import { loadEnvConfig } from "@next/env";
import { writeFile } from "node:fs/promises";

loadEnvConfig(process.cwd());
const siteUrl = new URL(process.env.SITE_URL || "https://michalsalaciak.pl");
if (!["https:", "http:"].includes(siteUrl.protocol)) throw new Error("SITE_URL must be an HTTP(S) URL");
const origin = siteUrl.origin;
const escapeXml = (value: string) => value.replace(/[<>&"']/g, (char) =>
  ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[char] ?? char);

async function generateSitemap() {
  await Promise.all([
    writeFile("public/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${escapeXml(origin)}/sitemap-0.xml</loc></sitemap></sitemapindex>\n`),
    writeFile("public/sitemap-0.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapeXml(origin)}/</loc></url></urlset>\n`),
    writeFile("public/robots.txt", `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`),
  ]);

}

generateSitemap().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
