import { createApp } from "@repo/hono";

const app = createApp();

// Attach routes as needed

const api = app.get("/ping", (c) => {
	return c.json({ message: "pong" });
});

export default api;
export type AppType = typeof api;
