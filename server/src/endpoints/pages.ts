import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getHostUrl, PageResponse } from "ao3-tg-shared";
import { AppContext } from "@/models/AppContext";

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
        const url = new URL(path, getHostUrl());
        console.info('Fetching', url.href);

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
                'Accept': 'text/html'
            }
        });

        if(!response.ok) {
            throw new Error(`Failed to fetch resource (${response.status}), ${response.statusText}`);
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