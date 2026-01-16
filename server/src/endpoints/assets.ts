import { OpenAPIRoute } from "chanfana";
import { AppContext, variables } from "@/types";
import { corsHeaders } from "@/middleware/cors.ts";
import { AssetsResponse, StyleSheetImportance, StyleSheetInfo } from "ao3-tg-shared";

export class Assets extends OpenAPIRoute {
    async fetchAsset(c: AppContext, name: string, media: string, importance: StyleSheetImportance): Promise<StyleSheetInfo | undefined> {
        const assetsUrl = new URL(`/media-${name}.css`, c.req.url);
        const res = await c.env.ASSETS.fetch(assetsUrl);
        const content = await res.text();

        if(!res.ok) {
            return;
        }

        return {
            name: name,
            contents: content,
            media: media,
            importance: importance
        }
    }

    async handle(c: AppContext) {
        const result: AssetsResponse = {
            variables: variables,
            stylesheets: [
                await this.fetchAsset(c, 'all', 'all', 'required'),
                await this.fetchAsset(c, 'midsize', 'only screen and (max-width: 62em)', 'recommended'),
                await this.fetchAsset(c, 'narrow', 'only screen and (max-width: 42em)', 'recommended'),
                await this.fetchAsset(c, 'aural', 'speech', 'optional'),
                await this.fetchAsset(c, 'print', 'print', 'optional'),
            ].filter(x => x !== undefined)
        };

        return Response.json(result, {
            headers: corsHeaders
        });
    }
}
