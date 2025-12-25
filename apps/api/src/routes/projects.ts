import { zValidator } from "@hono/zod-validator";
import { db } from "@repo/database";
import { ProjectInputSchema } from "@repo/database/validation";
import { Hono } from "@repo/hono";
import type { Env } from "@repo/hono/factory";
import { storage } from "@/lib/storage-provider";
import { ProjectService } from "@/services/projects.service";

export type ProjectsEnv = Env & {
	Variables: {
		service: ProjectService;
		organizationId: string;
	};
};

const app = new Hono<ProjectsEnv>()
	.use("*", async (c, next) => {
		// Extract organization ID from headers
		const organizationId = c.req.header(
			process.env.ORGANIZATION_ID_HEADER || "",
		);
		if (!organizationId) {
			return c.json({ error: "Organization ID header is missing." }, 400);
		}
		c.set("organizationId", organizationId);

		const service = new ProjectService(
			db,
			storage,
			c.var.userID || "",
			c.var.organizationId,
		);
		c.set("service", service);
		await next();
	})

	.get("", async (c) => {
		try {
			const projects = await c.var.service.getAll();
			return c.json({ data: projects }, 200);
		} catch (error) {
			console.error(error);
			return c.json(
				{ error: "An unexpected error occured. Please try again later." },
				500,
			);
		}
	})

	.get("/:id", async (c) => {
		const id = c.req.param("id");
		try {
			const project = await c.var.service.getByID(id);
			if (!project) {
				return c.json({ error: "Project not found." }, 404);
			}

			return c.json({ data: project }, 200);
		} catch (error) {
			console.error(error);
			return c.json(
				{ error: "An unexpected error occured. Please try again later." },
				500,
			);
		}
	})

	.post("/create", zValidator("json", ProjectInputSchema), async (c) => {
		try {
			const input = c.req.valid("json");
			const project = await c.var.service.create(input);
			return c.json({ data: project }, 201);
		} catch (error) {
			console.error(error);
			return c.json(
				{ error: "An unexpected error occured. Please try again later." },
				500,
			);
		}
	})

	.delete("/delete/:id", async (c) => {
		const id = c.req.param("id");
		try {
			const success = await c.var.service.delete(id);
			if (!success) {
				return c.json({ error: "Project not found." }, 404);
			}
		} catch (error) {
			console.error(error);
			return c.json(
				{ error: "An unexpected error occured. Please try again later." },
				500,
			);
		}
	});

export default app;
export type ProjectsRouteType = typeof app;
