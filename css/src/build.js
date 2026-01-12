import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { buildStyleSheets } from "./functions/build.js";

const INPUT_PATH = 'src/inputs';
const OUTPUT_PATH = '../dist';

const stylesheets = await buildStyleSheets(INPUT_PATH);

await mkdir(OUTPUT_PATH, {recursive: true});

for(const stylesheet of stylesheets) {
    const path = join(OUTPUT_PATH, stylesheet.name);

    await writeFile(path, stylesheet.css);
}