import postcssOklabFunction from "@csstools/postcss-oklab-function";
import postcssColorMix from "@csstools/postcss-color-mix-function";
import postcssCustomProperties from "postcss-custom-properties";
import postcssDiscard from "postcss-discard";
import postcssCalc from "postcss-calc";
import postcssImports from "postcss-import";
import postcssFunctions from "postcss-functions";
import postcssDiscardComments from "postcss-discard-comments";
import postcssNested from "postcss-nested";
import postcssRewriteURL from "@csstools/postcss-rewrite-url";
import postcssMinify from "@csstools/postcss-minify";
import cssFunctions from "./css-functions.ts";

export interface PluginOptions {
    step: 'prepare' | 'process'
    baseUrl?: string
}

export function getPlugins(options: PluginOptions) {
    const plugins = [];

    if(options.step === 'prepare') {
        plugins.push(
            postcssImports,
            postcssFunctions({
                functions: cssFunctions
            }),
            postcssDiscardComments,
            postcssRewriteURL({
                rewriter: value => {
                    if(!options.baseUrl || !value.url.startsWith('/')) {
                        return value;
                    }

                    return {
                        url: options.baseUrl + value.url,
                        urlModifiers: value.urlModifiers
                    }
                }
            }),
            postcssNested,
            postcssMinify
        );
    }
    else if(options.step === 'process') {
        plugins.push(
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
        );
    }

    return plugins;
}