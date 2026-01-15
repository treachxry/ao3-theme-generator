import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { AppContext } from "../types";
import postcss from "postcss";
import { processPlugins } from "../functions/css-plugins.ts";

export class Generate extends OpenAPIRoute {
	schema = {
		tags: ["Theme generation"],
		summary: "Generate a new AO3 site skin",
		responses: {
			"200": {
				description: "Returns the created task",
				content: {
					"application/json": {
						schema: z.object({
							series: z.object({
								success: Bool(),
							}),
						}),
					},
				},
			},
		},
	};

	async handle(c: AppContext) {
		const assetsUrl = new URL(`/media-midsize.css`, c.req.url);
		const res = await c.env.ASSETS.fetch(assetsUrl);
		const content = await res.text();

		if(!res.ok) {
			return;
		}

		const theme = `
			:root {
				/* colors */
				--color-base-100: oklch(16% 0.005 240);
				--color-base-200: oklch(20% 0.005 240);
				--color-base-300: oklch(24% 0.005 240);
				--color-base-content: oklch(88% 0.005 245);
				--color-primary: oklch(40% 0.176 29.23);
				--color-primary-content: oklch(88% 0.005 245);
				--color-secondary: oklch(75% 0.12 60);
				--color-secondary-content: oklch(14% 0.033 60);
				--color-accent: oklch(71% 0.12 310);
				--color-accent-content: oklch(14% 0.033 300);
				--color-neutral: oklch(27% 0.01 240);
				--color-neutral-content: oklch(70% 0.01 240);
				--color-info: oklch(85% 0.085 206);
				--color-info-content: oklch(17% 0.017 206);
				--color-success: oklch(85% 0.085 145);
				--color-success-content: oklch(17% 0.015 145);
				--color-warning: oklch(85% 0.085 75);
				--color-warning-content: oklch(17% 0.015 75);
				--color-error: oklch(85% 0.085 16);
				--color-error-content: oklch(17% 0.015 16);
			
				/* ui parameters */
				--ui-density: 0.125rem;
				--ui-roundness: 0.125rem;
				--ui-border: 1px;
			
				/* fonts */
				--font-serif: 'Georgia', serif;
				--font-sans: 'Lucida Grande', 'Lucida Sans Unicode', 'Verdana', 'Helvetica', sans-serif, 'GNU Unifont';
				--font-mono: 'Monaco', 'Consolas', 'Courier', monospace;
			}
		`;

		const file = theme + content;

		const result = await postcss(processPlugins).process(file, {from: undefined});

		return Response.json({
			before: content,
			after: result.css
		})
	}
}