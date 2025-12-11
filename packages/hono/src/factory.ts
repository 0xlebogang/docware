import { cors } from "hono/cors";
import { createFactory } from "hono/factory";
import { logger } from "hono/logger";

export type Env = {
	Variables: {
		userID?: string; // Authenticated user ID
		service?: unknown; // Placeholder for service instances
	};
};

// Export factory functions for external usage
export const factory = createFactory<Env>({
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
