import { generateStyles } from "./functions/generate-styles.ts";
import { generatePages } from "./functions/generate-pages.ts";

await Promise.all([
    generateStyles(),
    generatePages()
]);