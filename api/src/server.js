import express from "express";
import { buildStyleSheets } from "css/src/index.js";

function handleRequest() {
    return async (req, res) => {
        const css = await buildStyleSheets('../css/src/inputs');

        res.setHeader('Content-Type', 'text/json')
        res.send(css);
    };
}

function startServer() {
    const app = express();

    app.use(
        handleRequest()
    );

    return app.listen(3000);
}

startServer();