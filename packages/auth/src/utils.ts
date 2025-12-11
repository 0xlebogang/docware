import { auth } from "./server";

export async function checkAuthStatus(headers: Headers) {
	const session = await auth.api.getSession({
		headers,
	});

	return !!session;
}

export type User = (typeof auth.$Infer.Session)["user"];
export type Session = (typeof auth.$Infer.Session)["user"];
