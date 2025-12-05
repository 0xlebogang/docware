import { checkAuthentication } from "@repo/better-auth/helpers";
import { type NextRequest, NextResponse } from "next/server";

export const config = {
	// match all routes
	matcher: ["/dashboard"],
};

export async function proxy(request: NextRequest) {
	// check if user is authenticated
	const isAuthenticated = await checkAuthentication(request.headers);
	if (!isAuthenticated) {
		return NextResponse.redirect(process.env.NEXT_PUBLIC_SIGN_IN_URL || "");
	}
}
