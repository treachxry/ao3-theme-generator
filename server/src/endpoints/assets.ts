import { readStyleAssets } from "@/services/css.service";
import { OpenAPIRoute } from "chanfana";
import { AppContext } from "@/models/AppContext";
import { GenerateTaskType } from "@/models/GenerateTaskType";
import { SkinChunk } from "common/models";

export class Assets extends OpenAPIRoute {
    async handle(c: AppContext) {
        const stylesheets: SkinChunk[] = await readStyleAssets(c, GenerateTaskType.Prepare);

        return c.json(stylesheets);
    }
}
