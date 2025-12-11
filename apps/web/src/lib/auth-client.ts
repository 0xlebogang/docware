import { authClient as createAuthClient } from "@repo/auth/client";

export const client = createAuthClient(
	process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
);
