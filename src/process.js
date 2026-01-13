import path from "node:path";
import { readdir, readFile } from "node:fs/promises";
import postcss from "postcss";
import { processPlugins } from "./functions/css-plugins.js";

export async function processStyleSheets(inputDir) {
    const postCSS = postcss(processPlugins);
    const files = await readdir(inputDir, {withFileTypes: true});
    const stylesheets = [];

    for(const file of files) {
        if(!file.isFile()) {
            continue;
        }

        const filePath = path.join(file.parentPath, file.name);
        const css = await processStyleSheet(postCSS, filePath);

        stylesheets.push({
            name: file.name,
            css: css
        });
    }

    return stylesheets;
}

async function processStyleSheet(postCSS, filePath) {
    const contents = await readFile(filePath, 'utf-8');

    const result = await postCSS.process(contents, {
        from: filePath
    });

    return result.css;
}