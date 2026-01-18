import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { PageResponse } from "ao3-tg-shared";
import { AppContext } from "@/models/AppContext";
import { getAO3Url, readPageAsset } from "@/services/pages.service";

export class Pages extends OpenAPIRoute {
    schema = {
        request: {
            query: z.object({
                url: z.string()
            })
        }
    };

    async handle(c: AppContext) {
        const { query } = await this.getValidatedData<typeof this.schema>();

        const path = query.url;
        const response = await readPageAsset(c, path);
        const url = new URL(path, getAO3Url());

        if(!response.ok) {
            return c.notFound();
        }

        const html = await response.text();

        const data: PageResponse = {
            page: {
                url: url.href,
                html: html
            }
        };

        return c.json(data);
    }
}