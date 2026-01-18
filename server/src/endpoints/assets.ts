import { OpenAPIRoute } from "chanfana";
import { join } from "node:path";
import { AssetsResponse } from "ao3-tg-shared";
import { AppContext } from "@/models/AppContext";
import { readServerAsset } from "@/services/assets.service";
import { sheets, variables } from "@/services/css.service";

export class Assets extends OpenAPIRoute {
    async handle(c: AppContext) {
        const stylesheets = await Promise.all(sheets.map(async styleSheet => {
            const path = join('/urlfix', styleSheet.filename);
            const response = await readServerAsset(c, path);

            if(!response.ok) {
                return;
            }

            const contents = await response.text();

            return {
                css: contents,
                ...styleSheet
            };
        }));

        const result: AssetsResponse = {
            variables: variables,
            stylesheets: stylesheets.filter(x => x !== undefined)
        };

        return Response.json(result);
    }
}
