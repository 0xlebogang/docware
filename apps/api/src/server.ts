import app from "./app";

const server = Bun.serve({
	fetch: app.fetch,
	port: process.env.PORT || 5000,
});

console.log(`Server running on http://${server.hostname}:${server.port}`);
