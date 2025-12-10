import { checkAuthStatus } from "@repo/auth/utils";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const config = {
	matcher: "/:path*",
};

export async function proxy() {
	const headerList = await headers();
	const isAuthenticated = await checkAuthStatus(headerList);

	if (!isAuthenticated) {
		return NextResponse.redirect(
			process.env.NEXT_PUBLIC_SIGN_IN_URL || "http://localhost:3001/sign-in",
		);
	}

	return NextResponse.next();
}
