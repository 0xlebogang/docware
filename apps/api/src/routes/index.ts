import type { auth } from "@repo/better-auth/server";
import { Hono } from "hono";
import { authMiddleware } from "@/middleware/auth";

type Vars = {
	session: typeof auth.$Infer.Session | null;
	userId: string | null;
};

const app = new Hono<{ Variables: Vars }>();

app.use("*", authMiddleware);

const routes = app.get("/protected", (c) => {
	const userId = c.get("userId");
	return c.json({ message: "This is a protected route", userId });
});

export default routes;
export type RoutesType = typeof routes;
