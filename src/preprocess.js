import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import postcss from "postcss";
import { preprocessPlugins } from "./functions/css-plugins.js";

const INPUT_PATH = 'src/assets/inputs';
const OUTPUT_PATH = 'dist/assets';

await main();

async function main() {
    const files = await readdir(INPUT_PATH, {withFileTypes: true});
    const postCss = postcss(preprocessPlugins);

    await mkdir(OUTPUT_PATH, {recursive: true});
    await Promise.all(files.map(file => preprocessStyleSheet(postCss, file)));
}

async function preprocessStyleSheet(postCss, file) {
    if(!file.isFile()) {
        return;
    }

    const inputPath = join(file.parentPath, file.name);
    const contents = await readFile(inputPath, 'utf-8');

    const processed = await postCss.process(contents, {
        from: inputPath
    });

    const outputPath = join(OUTPUT_PATH, file.name);

    await writeFile(outputPath, processed.css);
}