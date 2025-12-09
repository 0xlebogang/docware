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
				origin: "*",
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
	},
});
