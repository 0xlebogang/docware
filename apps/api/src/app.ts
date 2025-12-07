import { auth } from "@repo/better-auth/server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());
app.use(
	cors({
		origin: process.env.CORS_ALLOWED_ORIGINS?.split(",") || [],
		credentials: true,
	}),
);

// Auth route
app.on(["GET", "POST", "OPTIONS"], "/api/auth/*", (c) =>
	auth.handler(c.req.raw),
);

// Health check endpoint
app.get("/health", (c) => {
	return c.json({ message: "ok" });
});

export default app;
export type AppType = typeof app;
