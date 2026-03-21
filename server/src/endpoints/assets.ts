import { OpenAPIRoute } from "chanfana";
import { CssAssetBundle } from "common/models";
import { AppContext } from "@/models/AppContext";
import { GenerateTaskType } from "@/models/GenerateTaskType";
import { getTheme, readStyleAssets } from "@/services/css.service";

export class Assets extends OpenAPIRoute {
    async handle(c: AppContext) {
        const theme = getTheme();
        const stylesheets = await readStyleAssets(c, GenerateTaskType.Prepare);

        const data: CssAssetBundle = {
            theme: theme,
            stylesheets: stylesheets
        };

        return Response.json(data);
    }
}
