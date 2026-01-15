import { fromHono } from "chanfana";
import { Hono } from "hono";
import { Assets } from "@/endpoints/assets";
import { Generate } from "@/endpoints/generate";

const app = new Hono<{ Bindings: Env }>();

const openapi = fromHono(app, {
    docs_url: "/",
});

openapi.get("/api/assets", Assets);
openapi.get("/api/generate", Generate);

export default app;