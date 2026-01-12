import path from "path";
import { readdir, readFile } from "fs/promises";
import postcss from "postcss";
import postcssConfig from "../../postcss.config.js";

export async function buildStyleSheets(inputDir) {
    const postCSS = await postcss(postcssConfig.plugins);
    const files = await readdir(inputDir, {withFileTypes: true});
    const stylesheets = [];

    for (const file of files) {
        if(!file.isFile()) {
            continue;
        }

        const filePath = path.join(file.parentPath, file.name);
        const css = await buildStyleSheet(postCSS, filePath);

        stylesheets.push({
           name: file.name,
           css: css
        });
    }

    return stylesheets;
}

async function buildStyleSheet(postCSS, filePath) {
    const contents = await readFile(filePath, 'utf-8');

    const result = await postCSS.process(contents, {
        from: filePath
    });

    return result.css;
}