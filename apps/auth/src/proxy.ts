import { auth } from "@repo/better-auth/server";
import { type NextRequest, NextResponse } from "next/server";

export const config = {
	// match all routes
	matcher: "/:path*",
};

export async function proxy(request: NextRequest) {
	// check if user is authenticated
	const isAuthenticated = await isAthenticated(request.headers);
	if (isAuthenticated) {
		return NextResponse.redirect(process.env.NEXT_PUBLIC_DASHBOARD_URL || "");
	}

	// redirect to sign-in if user is unauthenticated and trying to access the root path
	if (request.nextUrl.pathname === "/") {
		return NextResponse.redirect(process.env.NEXT_PUBLIC_SIGN_IN_URL || "");
	}
}

export async function isAthenticated(headers: Headers): Promise<boolean> {
	const session = await auth.api.getSession({ headers });
	return !!session;
}
