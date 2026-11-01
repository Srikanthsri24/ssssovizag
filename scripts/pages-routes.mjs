import { mkdir, copyFile, readFile } from 'node:fs/promises';
const routes = ['about','education','healthcare','welfare','events','gallery','volunteer','contact','devotee-registration','bhajan-mandalis'];
const data = await readFile('src/lib/bhajan-mandalis.ts','utf8');
for (const match of data.matchAll(/slug:\s*"([a-z-]+)"/g)) routes.push(`bhajan-mandalis/${match[1]}`);
for (const route of routes) {
  await mkdir(`dist/${route}`,{recursive:true});
  await copyFile('dist/index.html',`dist/${route}/index.html`);
}
await copyFile('dist/index.html','dist/404.html');
console.log(`Prepared ${routes.length} routes for GitHub Pages.`);
