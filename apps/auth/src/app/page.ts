import { auth } from "@repo/better-auth/server";
import { headers } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

const DASHBOARD_URL = process.env.NEXT_PUBLIC_LANDING_DASHBOARD_URL;
if (!DASHBOARD_URL) {
	throw new Error(
		"Missing 'NEXT_PUBLIC_LANDING_DASHBOARD_URL' environment variable",
	);
}

export default async function Index() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	// check if user is authenticated
	if (!session) {
		redirect("/sign-in", RedirectType.replace);
	}

	redirect(DASHBOARD_URL || "/dashboard", RedirectType.replace);
}
