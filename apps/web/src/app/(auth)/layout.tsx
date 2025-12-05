import { checkAuthentication } from "@repo/better-auth/helpers";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type * as React from "react";

interface AuthLayoutProps {
	children: Readonly<React.ReactNode>;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
	const data = await headers();

	// redirect to dashboard if user is already authenticated
	const isAuthenticated = await checkAuthentication(data);
	if (isAuthenticated) {
		return redirect(process.env.NEXT_PUBLIC_DASHBOARD_URL as string);
	}

	return (
		<section className="flex min-h-screen bg-backgound px-4 py-16 md:py-32 dark:bg-transparent">
			{children}
		</section>
	);
}
