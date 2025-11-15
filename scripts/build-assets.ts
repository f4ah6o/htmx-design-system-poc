import fs from 'node:fs';
import path from 'node:path';
import nunjucks from 'nunjucks';

const root = process.cwd();
const templatePaths = [
  path.join(root, 'templates'),
  path.join(root, 'components')
];

const env = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(templatePaths, {
    noCache: true,
    watch: false
  }),
  { autoescape: true }
);

const pages = [
  { template: 'index.html', key: 'home' },
  { template: 'atoms.html', key: 'atoms' },
  { template: 'molecules.html', key: 'molecules' }
];

const rendered: Record<string, string> = {};

for (const page of pages) {
  rendered[page.key] = env.render(page.template);
}

const outputDir = path.join(root, 'src', 'generated');
fs.mkdirSync(outputDir, { recursive: true });

const pagesFile = `export const pages = ${JSON.stringify(rendered, null, 2)} as const;\n`;
fs.writeFileSync(path.join(outputDir, 'pages.ts'), pagesFile, 'utf8');

const cssPath = path.join(root, 'static', 'css', 'app.css');
if (!fs.existsSync(cssPath)) {
  console.error('CSS asset not found. Run `npm run build:css` first.');
  process.exit(1);
}

const cssContent = fs.readFileSync(cssPath, 'utf8');
const cssFile = `export const appCss = ${JSON.stringify(cssContent)};\n`;
fs.writeFileSync(path.join(outputDir, 'styles.ts'), cssFile, 'utf8');

console.log('Generated src/generated/pages.ts and src/generated/styles.ts');
