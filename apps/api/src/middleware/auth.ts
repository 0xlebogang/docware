import { auth } from "@repo/better-auth/server";
import { createMiddleware } from "hono/factory";

export const authMiddleware = createMiddleware(async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });
	if (!session?.user) {
		return c.json({ message: "Unauthorized" }, 401);
	}

	c.set("userId", session.user.id);

	return next();
});
