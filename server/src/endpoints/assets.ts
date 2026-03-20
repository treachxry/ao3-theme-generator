import { OpenAPIRoute } from "chanfana";
import { CssAssetBundle } from "common/models";
import { AppContext } from "@/models/AppContext";
import { CssAssetType } from "@/models/CssAssetType";
import { getTheme, readStyleAssets } from "@/services/css.service";

export class Assets extends OpenAPIRoute {
    async handle(c: AppContext) {
        const theme = getTheme();
        const stylesheets = await readStyleAssets(c, CssAssetType.PREPARED);

        const data: CssAssetBundle = {
            theme: theme,
            stylesheets: stylesheets
        };

        return Response.json(data);
    }
}
