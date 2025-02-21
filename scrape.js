const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
    try {
        const url = process.env.SCRAPE_URL || "https://example.com";
        console.log(` Scraping: ${url}`);

        const browser = await puppeteer.launch({
            headless: true,
            executablePath: "/usr/bin/chromium",
            args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--disable-dev-shm-usage"]
        });

        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

        const data = await page.evaluate(() => ({
            title: document.title || "No title found",
            heading: document.querySelector("h1") ? document.querySelector("h1").innerText : "No heading found"
        }));

        console.log("✅ Scraping successful:", data);
        fs.writeFileSync("/app/scraped_data.json", JSON.stringify(data, null, 2));

        await browser.close();
    } catch (error) {
        console.error("❌ Scraping failed:", error);
        fs.writeFileSync("/app/scraped_data.json", JSON.stringify({ error: error.message }, null, 2));
    }
})();
