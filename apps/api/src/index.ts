import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
	return c.json({ message: "Hello from HONO!" });
});

serve(
	{
		fetch: app.fetch,
		port: Number.parseInt(process.env.PORT as string, 10) || 3001,
	},
	(info) => {
		console.log(`Server running at http://localhost:${info.port}`);
	},
);
