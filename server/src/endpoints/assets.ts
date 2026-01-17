import { OpenAPIRoute } from "chanfana";
import { AppContext, fetchStyleSheet, sheets, variables } from "@/types";
import { AssetsResponse } from "ao3-tg-shared";

export class Assets extends OpenAPIRoute {
    async handle(c: AppContext) {
        const stylesheets = await Promise.all(sheets.map(async s => fetchStyleSheet(c, s, '/urlfix')));

        const result: AssetsResponse = {
            variables: variables,
            stylesheets: stylesheets.filter(x => x !== undefined)
        };

        return Response.json(result);
    }
}
