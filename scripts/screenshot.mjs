// Script utilitário para capturar screenshots das páginas em dev local.
// Uso: node scripts/screenshot.mjs
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = "http://localhost:3737";
const OUT = "../.firecrawl";
const PAGES = [
  { path: "/", file: "curso-home.png" },
  { path: "/sprint/2", file: "curso-sprint2.png" },
  { path: "/sprint/3", file: "curso-sprint3.png" },
  { path: "/sprint/4", file: "curso-sprint4.png" },
];

await mkdir(OUT, { recursive: true }).catch(() => {});

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1400, height: 900 },
  deviceScaleFactor: 2,
  colorScheme: "dark",
});
const page = await ctx.newPage();

// Helper: scrolla a página inteira progressivamente para disparar
// IntersectionObserver de Framer Motion, depois volta ao topo.
async function autoScrollEntirePage(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const distance = 200;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        total += distance;
        if (total >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo({ top: 0, behavior: "instant" });
          setTimeout(resolve, 600);
        }
      }, 40);
    });
  });
}

for (const p of PAGES) {
  console.log(`Capturando ${p.path}...`);
  await page.goto(BASE + p.path, { waitUntil: "networkidle" });
  await autoScrollEntirePage(page);
  await page.waitForTimeout(400);
  await page.screenshot({
    path: `${OUT}/${p.file}`,
    fullPage: true,
  });
  console.log(`  → ${OUT}/${p.file}`);
}

await browser.close();
console.log("Done.");
