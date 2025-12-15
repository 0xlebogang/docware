import type { AppType } from "api/rpc";
import { hc } from "hono/client";

export const api = hc<AppType>(process.env.NEXT_PUBLIC_API_BASE_URL as string, {
	init: {
		credentials: "include",
	},
});
