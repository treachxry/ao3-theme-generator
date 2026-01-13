import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { AppContext } from "@/types";

/*export class Generate extends OpenAPIRoute {
	schema = {
		tags: ["Theme generation"],
		summary: "Generate a new AO3 site skin",
		request: {
			body: {
				content: {
					"application/json": {
					},
				},
			},
		},
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
		// Get validated data
		const data = await this.getValidatedData<typeof this.schema>();

		// Retrieve the validated request body
		const taskToCreate = data.body;

		// Implement your own object insertion here

		// return the new task
		return {
			success: true
		};
	}
}
*/