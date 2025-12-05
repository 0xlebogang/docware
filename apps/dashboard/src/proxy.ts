import { checkAuthentication } from "@repo/better-auth/helpers";
import { type NextRequest, NextResponse } from "next/server";

export const config = {
	// Run on all paths
	matcher: "/:path*",
};

export async function proxy(request: NextRequest) {
	const isAuthenticated = await checkAuthentication(request.headers);
	if (!isAuthenticated) {
		return NextResponse.redirect(process.env.NEXT_PUBLIC_SIGN_IN_URL || "");
	}

	return NextResponse.next();
}
