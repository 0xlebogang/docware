import { zValidator } from "@hono/zod-validator";
import { db } from "@repo/database";
import { OrganizationInputSchema } from "@repo/database/validation";
import { Hono } from "@repo/hono";
import type { Env } from "@repo/hono/factory";
import { storage } from "@/lib/storage-provider";
import { OrganizationService } from "@/services/orgs.service";

export type OrgEnv = Env & {
	Variables: {
		service: OrganizationService;
	};
};

const app = new Hono<OrgEnv>()
	.use("*", async (c, next) => {
		const service = new OrganizationService(db, c.var.userID || "", storage);
		c.set("service", service);
		await next();
	})

	.get("", async (c) => {
		try {
			const orgs = await c.var.service.getAll();
			return c.json({ data: orgs }, 200);
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
			const org = await c.var.service.getByID(id);
			if (!org) {
				return c.json({ error: "Organization not found." }, 404);
			}

			return c.json({ data: org }, 200);
		} catch (error) {
			console.error(error);
			return c.json(
				{ error: "An unexpected error occured. Please try again later." },
				500,
			);
		}
	})

	.post("/create", zValidator("json", OrganizationInputSchema), async (c) => {
		try {
			const input = c.req.valid("json");
			const org = await c.var.service.create(input);
			return c.json({ data: org }, 201);
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
				return c.json({ error: "Organization not found." }, 404);
			}

			return c.body(null, 204);
		} catch (error) {
			console.error(error);
			return c.json(
				{ error: "An unexpected error occured. Please try again later." },
				500,
			);
		}
	});

export default app;
export type OrgsRouteType = typeof app;
