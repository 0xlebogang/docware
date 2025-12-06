import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());
app.use(
	cors({
		origin: process.env.CORS_ALLOWED_ORIGINS?.split(",") || [],
	}),
);

// Health check endpoint
app.get("/health", (c) => {
	return c.json({ message: "ok" });
});

export default app;
export type AppType = typeof app;
