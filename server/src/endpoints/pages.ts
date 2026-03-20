import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getHostUrl } from "common/functions";
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
            c.status(response.status as any);

            return c.text(response.statusText);
        }

        const html = await response.text();

        return c.text(html);
    }
}