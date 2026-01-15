import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { AppContext, SkinFile, Variable } from "../types";

export class Assets extends OpenAPIRoute {
    schema = {
        tags: ["Theme generation"],
        summary: "Get site skin assets for preview",
        responses: {
            "200": {
                description: "Returns a list of CSS files",
                content: {
                    "application/json": {
                        schema: z.object({
                            variables: z.array(Variable),
                            files: z.array(SkinFile)
                        })
                    },
                },
            },
        },
    };

    async fetchAsset(c: AppContext, name: string, media: string, importance: string) {
        const assetsUrl = new URL(`/media-${name}.css`, c.req.url);
        const res = await c.env.ASSETS.fetch(assetsUrl);
        const content = await res.text();

        if(!res.ok) {
            return;
        }

        return  {
            name: name,
            css: content,
            media: media,
            importance: importance
        }
    }

    async handle(c: AppContext) {
        const result = {
            variables: [
                {
                    type: 'color',
                    name: '--color-primary',
                    default: 'oklch(40% 0.176 29.23)',
                    description: 'Primary color'
                },
                {
                    type: 'number',
                    name: '--ui-border',
                    default: '1px',
                    description: 'Border width (px)'
                }
            ],
            files: [
                await this.fetchAsset(c, 'all', 'all', 'required'),
                await this.fetchAsset(c, 'midsize', 'only screen and (max-width: 62em)', 'recommended'),
                await this.fetchAsset(c, 'narrow', 'only screen and (max-width: 42em)', 'recommended'),
                await this.fetchAsset(c, 'aural', 'speech', 'optional'),
                await this.fetchAsset(c, 'print', 'print', 'optional'),
            ].filter(x => x !== undefined)
        };

        return Response.json(result);
    }
}
