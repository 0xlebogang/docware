import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./server.js";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!baseURL) {
	throw new Error("AUTH_BASE_URL is not defined in environment variables");
}

export const authClient = createAuthClient({
	baseURL,
	plugins: [inferAdditionalFields<typeof auth>()],
});
