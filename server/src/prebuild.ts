import { generateStyles } from "@/functions/generate-styles";
import { generatePages } from "@/functions/generate-pages";

await Promise.all([
    generatePages(['/', '/works']),
    generateStyles(false),
    generateStyles(true),
]);