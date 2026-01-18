import { fromHono } from "chanfana";
import { cors } from "hono/cors";
import { Hono } from "hono";
import { Assets } from "@/endpoints/assets";
import { Generate } from "@/endpoints/generate";
import { Pages } from "@/endpoints/pages";

const app = new Hono<{ Bindings: Env }>();

app.use('/*', cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['*'],
    maxAge: 86400
}));

const openapi = fromHono(app, {
    docs_url: "/",
});

openapi.get("/api/assets", Assets);
openapi.get("/api/pages", Pages);
openapi.post("/api/generate", Generate);

export default app;