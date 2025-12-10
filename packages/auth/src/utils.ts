import { auth } from "./server";

export async function checkAuthStatus(headers: Headers) {
	const session = await auth.api.getSession({
		headers,
	});

	return !!session;
}
