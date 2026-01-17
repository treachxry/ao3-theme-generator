import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { AppContext, fetchStyleSheet, sheets } from "@/types";
import postcss from "postcss";
import { getPlugins } from "@/functions/css-plugins.ts";
import { StyleSheetInfo, GenerateResponse } from "ao3-tg-shared";

export class Generate extends OpenAPIRoute {
    schema = {
        request: {
            body: contentJson(z.array(z.array(z.string()))),
        }
    };

    async handle(c: AppContext) {
        const data = await this.getValidatedData<typeof this.schema>();
        const body = data.body;

        // TODO: this is NOT safe
        const variableSheet = `:root{${body.map(i => `${i[0]}: ${i[1]}`).join(';')}}`;

        const postCss = postcss(getPlugins({
            step: 'process'
        }));

        const stylesheets: StyleSheetInfo[] = await Promise.all(sheets.map(async s => {
            const rawSheet = await fetchStyleSheet(c, s);
            const merged = variableSheet + (rawSheet?.contents ?? '');

            const results = await postCss.process(merged, {from: undefined});

            return {
                name: s.name,
                media: s.media,
                importance: s.importance,
                contents: results.css
            };
        }));

        const response: GenerateResponse = {
            stylesheets: stylesheets
        };

        return Response.json(response);
    }
}