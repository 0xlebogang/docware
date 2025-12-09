import { createApp } from "@repo/hono";
import authRoute from "./routes/auth";

const app = createApp();

app.route("", authRoute);

const api = app.get("/ping", (c) => {
	return c.json({ message: "pong" });
});

export default api;
export type AppType = typeof api;
