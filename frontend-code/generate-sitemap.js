const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream, writeFileSync } = require("fs");
const { resolve } = require("path");

const BASE_URL = "https://studystreak.in/";

async function generateSitemap() {
  try {
    const sitemap = new SitemapStream({ hostname: BASE_URL });
    const sitemapPath = resolve(__dirname, "public", "sitemap.xml");
    const writeStream = createWriteStream(sitemapPath);

    writeStream.on("error", (err) => {
      console.error("Error writing sitemap file:", err);
    });

    const staticLinks = [
      { url: "/", changefreq: "daily", priority: 1.0 },
      { url: "/courses", changefreq: "daily", priority: 0.8 },
      { url: "/ielts", changefreq: "daily", priority: 0.8 },
      { url: "/about-us", changefreq: "daily", priority: 0.8 },
      { url: "/talk-to-us", changefreq: "daily", priority: 0.8 },
      { url: "/blogs", changefreq: "daily", priority: 0.8 },
      { url: "/privacy-policy", changefreq: "daily", priority: 0.7 },
      { url: "/terms-and-conditions", changefreq: "daily", priority: 0.7 },
      { url: "/refund-policy", changefreq: "daily", priority: 0.7 },
    ];

    staticLinks.forEach((link) => sitemap.write(link));

    const blogsResponse = await fetch("https://studystreak.in/api/blog-list/");
    const blogs = await blogsResponse.json();
    blogs.forEach((blog) => {
      sitemap.write({
        url: `/blogs/${blog.slug}`,
        changefreq: "daily",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      });
    });

    sitemap.end();

    const data = await streamToPromise(sitemap);
    writeStream.write(data);
    writeStream.end();

    // Generate robots.txt
    const robotsTxtContent = `User-agent: *
Disallow:

Sitemap: ${BASE_URL}sitemap.xml
`;

    const robotsTxtPath = resolve(__dirname, "public", "robots.txt");
    writeFileSync(robotsTxtPath, robotsTxtContent);

    console.log("✅ Sitemap and robots.txt generated successfully!");
  } catch (err) {
    console.error("Error generating sitemap:", err);
    process.exit(1);
  }
}

generateSitemap();
