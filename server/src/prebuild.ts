import { generateStyles } from "@/functions/generate-styles";

await Promise.all([
    generateStyles(false),
    generateStyles(true),
]);