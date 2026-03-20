import { contentJson, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { ThemeInfo } from "common/models";
import { AppContext } from "@/models/AppContext";
import { generateCss } from "@/services/css.service";

export class Generate extends OpenAPIRoute {
    schema = {
        request: {
            body: contentJson(z.array(z.array(z.string()))),
        }
    };

    async handle(c: AppContext) {
        const {body} = await this.getValidatedData<typeof this.schema>();

        const stylesheets = await generateCss(c, body);

        const data: ThemeInfo = {
            stylesheets: stylesheets
        };

        return c.json(data);
    }
}