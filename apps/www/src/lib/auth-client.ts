import { authClient } from "@repo/auth/client";

export const { useSession } = authClient(
	import.meta.env.PUBLIC_API_BASE_URL || "http://localhost:5000",
);
