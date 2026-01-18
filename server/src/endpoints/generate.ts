import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import postcss from "postcss";
import { getPlugins } from "@/functions/css-plugins";
import { GenerateResponse, CssFileResult } from "ao3-tg-shared";
import { AppContext } from "@/models/AppContext";
import { readServerAsset } from "@/services/assets.service";
import { sheets } from "@/services/css.service";

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

        const stylesheets = await Promise.all(sheets.map(async s => {
            const rawSheet = await fetchStyleSheet(c, s.filename);
            const merged = variableSheet + (rawSheet ?? '');

            const results = await postCss.process(merged, {from: undefined});

            return {
                ...s,
                css: results.css
            } satisfies CssFileResult;
        }));

        const response: GenerateResponse = {
            stylesheets: stylesheets
        };

        return c.json(response);
    }
}

async function fetchStyleSheet(context: AppContext, filename: string): Promise<string | undefined> {
    const path = `/${filename}`;
    const response = await readServerAsset(context, path);
    const content = await response.text();

    if(!response.ok) {
        return;
    }

    return content;
}