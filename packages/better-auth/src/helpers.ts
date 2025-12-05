import { auth } from "./server";

export async function checkAuthentication(headers: Headers) {
	const session = await auth.api.getSession({ headers });
	return !!session?.user;
}
