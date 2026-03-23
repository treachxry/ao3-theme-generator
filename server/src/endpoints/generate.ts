import { z } from "zod";
import { contentJson, OpenAPIRoute } from "chanfana";
import { generateCss } from "@/services/css.service";
import { SkinChunk } from "common/models";
import { AppContext } from "@/models/AppContext";

export class Generate extends OpenAPIRoute {
    schema = {
        request: {
            body: contentJson(z.array(z.array(z.string()))),
        }
    };

    async handle(c: AppContext) {
        const {body} = await this.getValidatedData<typeof this.schema>();

        const stylesheets: SkinChunk[] = await generateCss(c, body);

        return c.json(stylesheets);
    }
}