import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { checkAuthStatus } from "./lib/utils";

export async function proxy(request: NextRequest) {
	const headerList = await headers();
	const isAuthenticated = await checkAuthStatus(headerList);

	if (isAuthenticated) {
		return NextResponse.redirect(
			process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3000",
		);
	}

	if (request.nextUrl.pathname === "/")
		return NextResponse.redirect(
			process.env.NEXT_PUBLIC_SIGN_IN_URL || "http://localhost:3001/sign-in",
		);

	return NextResponse.next();
}
