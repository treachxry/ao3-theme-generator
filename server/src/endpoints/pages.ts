import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getHostUrl } from "shared/functions";
import { HtmlAsset } from "shared/models";
import { AppContext } from "@/models/AppContext";
import { fetchPage } from "@/services/pages.service";

export class Pages extends OpenAPIRoute {
    schema = {
        request: {
            query: z.object({
                url: z.string()
            })
        }
    };

    async handle(c: AppContext) {
        const {query} = await this.getValidatedData<typeof this.schema>();

        const url = new URL(query.url, getHostUrl());

        const response = await fetchPage(url);

        if(!response.ok) {
            c.status(400);

            return c.text(response.statusText);
        }

        const html = await response.text();

        const data: HtmlAsset = {
            content: html,
            url: url.href,
        };

        return c.json(data);
    }
}