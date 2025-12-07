import { getAuthClient } from "@repo/better-auth/client";

export const { signUp, signIn, useSession, signOut } = getAuthClient(
	process.env.NEXT_PUBLIC_AUTH_URL,
);
