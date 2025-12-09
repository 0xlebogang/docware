import { auth } from "@repo/auth/server";
import { Hono } from "@repo/hono";

// Better-Auth required authentication route handler
const app = new Hono();

app.on(["POST", "GET"], "/api/auth/*", (c) => {
	return auth.handler(c.req.raw);
});

export default app;
