import postcssOklabFunction from "@csstools/postcss-oklab-function";
import postcssColorMix from "@csstools/postcss-color-mix-function";
import postcssCustomProperties from "postcss-custom-properties";
import postcssDiscard from "postcss-discard";
import postcssCalc from "postcss-calc";
import postcssImports from "postcss-import";
import postcssFunctions from "postcss-functions";
import postcssDiscardComments from "postcss-discard-comments";
import postcssNested from "postcss-nested";
import postcssMinify from "@csstools/postcss-minify";
import cssFunctions from "./css-functions.ts";

export const preprocessPlugins = [
    postcssImports,
    postcssFunctions({
        functions: cssFunctions
    }),
    postcssDiscardComments,
    postcssNested,
    postcssMinify
];

export const processPlugins = [
    postcssOklabFunction({
        preserve: false,
        subFeatures: {
            displayP3: false
        }
    }),
    postcssCustomProperties({
        preserve: false
    }),
    postcssCalc,
    postcssColorMix({
        preserve: false
    }),
    postcssDiscard({
        rule: ':root'
    }),
    postcssMinify
];