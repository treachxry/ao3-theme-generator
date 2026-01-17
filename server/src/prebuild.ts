import { generateStyles } from "./functions/generate-styles.ts";
import { generatePages } from "./functions/generate-pages.ts";
import { join } from "node:path";

const OUTPUT_PATH = '.server-assets';

await Promise.all([
    generateStyles(OUTPUT_PATH, false),
    generateStyles(join(OUTPUT_PATH, 'urlfix'), true),
    generatePages()
]);