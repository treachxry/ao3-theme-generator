import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { Dirent } from "node:fs";
import postcss, { Processor } from "postcss";
import { getPlugins } from "./css-plugins";
import { writeServerAsset } from "@/services/assets.service";

const CSS_INPUT_PATH = 'src/assets/inputs';

export async function generateStyles(fixUrls: boolean): Promise<void> {
    const postCss = postcss(getPlugins({
        step: 'prepare',
        baseUrl: fixUrls ? '/ao3-theme-generator' : undefined
    }));

    const outputDir = fixUrls ? 'urlfix' : '.';
    const files = await readdir(CSS_INPUT_PATH, {withFileTypes: true});

    await Promise.all(files.map(file => preprocessStyleSheet(postCss, file, outputDir)));
}

async function preprocessStyleSheet(postCss: Processor, file: Dirent, outputDir: string): Promise<void> {
    if(!file.isFile()) {
        return;
    }

    const inputPath = join(file.parentPath, file.name);
    const contents = await readFile(inputPath, 'utf-8');

    const processed = await postCss.process(contents, {
        from: inputPath
    });

    const outputPath = join(outputDir, file.name);

    await writeServerAsset(outputPath, processed.css);
}