import { OpenAPIRoute } from "chanfana";
import { AppContext } from "@/types";

export class Generate extends OpenAPIRoute {
    async handle(c: AppContext) {
        return Response.json(null, {status: 403})
    }
}