import { cors } from "hono/cors";
import { createFactory } from "hono/factory";
import { logger } from "hono/logger";

// Re-export all Hono exports
export * from "hono";

// Export factory functions for external usage
export const { createApp, createHandlers, createMiddleware } = createFactory({
	initApp: (app) => {
		// Attach global middlewares
		app.use(logger());

		app.use(
			cors({
				origin: process.env.CORS_ALLOWED_ORIGINS?.split(",") || [
					"http://localhost:3000",
				],
				allowMethods: process.env.CORS_ALLOWED_METHODS?.split(",") || [
					"GET",
					"POST",
					"PATCH",
					"DELETE",
					"OPTIONS",
				],
				credentials: true,
			}),
		);

		// Attach global health check endpoint
		app.get("/health", (c) => {
			return c.json({ status: "ok" });
		});
	},
});
