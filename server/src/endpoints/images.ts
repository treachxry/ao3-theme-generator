import { OpenAPIRoute } from "chanfana";
import { AppContext } from "@/types";

export class Images extends OpenAPIRoute {
    async handle(c: AppContext) {
        const path = c.req.path;

        console.log('image path requested:', path)

        return Response.json(null);
    }
}