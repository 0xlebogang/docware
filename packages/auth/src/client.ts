import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./server.js";

export const authClient = (baseURL: string) =>
	createAuthClient({
		baseURL,
		plugins: [inferAdditionalFields<typeof auth>()],
	});
