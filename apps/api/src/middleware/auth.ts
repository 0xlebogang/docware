import { auth } from "@repo/better-auth/server";
import { createMiddleware } from "hono/factory";

export const authMiddleware = createMiddleware(async (c, next) => {
	const sessionData = await auth.api.getSession({ headers: c.req.raw.headers });
	if (!sessionData?.user) {
		return c.json({ message: "Unauthorized" }, 401);
	}

	c.set("userId", sessionData.user.id);

	return next();
});
