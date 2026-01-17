import { OpenAPIRoute } from "chanfana";
import { AppContext } from "@/types";
import { encodePageName } from "../functions/encode.ts";
import { PageResponse } from "ao3-tg-shared";

export class Pages extends OpenAPIRoute {
    async handle(c: AppContext) {
        const path = '/works';
        const pageUrl = new URL(`/${encodePageName(path)}`, c.req.url);
        const pageRes = await c.env.ASSETS.fetch(pageUrl);
        const pageContent = await pageRes.text();

        const result: PageResponse = {
            url: `https://archiveofourown.org${path}`,
            html: pageContent
        };

        return Response.json(result);
    }
}