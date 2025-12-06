import { serve } from "@hono/node-server";
import app from "./app";

serve(
	{
		fetch: app.fetch,
		port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
	},
	(info) => {
		console.log(`Server running on ${info.address}:${info.port}`);
	},
);
