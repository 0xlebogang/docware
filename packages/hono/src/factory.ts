import { cors } from "hono/cors";
import { createFactory } from "hono/factory";
import { logger } from "hono/logger";

export type AppEnv = {
	Variables: {
		userId: string; // authenticated user's ID
	};
};

// Export factory functions function for external usage
export const { createApp, createHandlers, createMiddleware } =
	createFactory<AppEnv>({
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
