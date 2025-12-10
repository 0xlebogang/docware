import { authClient } from "@repo/auth/client";

export const client = authClient(
	process.env.PUBLIC_API_BASE_URL || "http://localhost:5000",
);
