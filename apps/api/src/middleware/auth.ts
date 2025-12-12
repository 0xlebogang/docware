import { auth } from "@repo/auth/server";
import { createMiddleware } from "@repo/hono";

export const authMiddleware = createMiddleware(async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });
	if (!session) {
		return c.json({ message: "Unauthorized" }, 401);
	}

	c.set("userID", session.user.id);
	return next();
});
