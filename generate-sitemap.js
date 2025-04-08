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
      { url: "/courses", changefreq: "weekly", priority: 0.8 },
      { url: "/ielts", changefreq: "weekly", priority: 0.7 },
      { url: "/about-us", changefreq: "monthly", priority: 0.5 },
      { url: "/why-choose-us", changefreq: "monthly", priority: 0.5 },
      { url: "/blogs", changefreq: "weekly", priority: 0.8 },
      { url: "/talk-to-us", changefreq: "monthly", priority: 0.6 },
      { url: "/become-a-partner", changefreq: "monthly", priority: 0.6 },
    ];

    staticLinks.forEach((link) => sitemap.write(link));

    const coursesResponse = await fetch(
      "https://studystreak.in/api/courselistview/?search=&Category__name="
    );
    const courses = await coursesResponse.json();
    courses.forEach((course) => {
      sitemap.write({
        url: `/course/${course.id}`,
        changefreq: "weekly",
        priority: 0.7,
        lastmod: course.updated_at || new Date().toISOString(),
      });
    });

    const blogsResponse = await fetch("https://studystreak.in/api/blog-list/");
    const blogs = await blogsResponse.json();
    blogs.forEach((blog) => {
      sitemap.write({
        url: `/blogs/${blog.slug}`,
        changefreq: "monthly",
        priority: 0.6,
        lastmod: blog.updated_at || new Date().toISOString(),
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
