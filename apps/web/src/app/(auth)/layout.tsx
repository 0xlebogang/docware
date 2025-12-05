import type * as React from "react";

interface AuthLayoutProps {
	children: Readonly<React.ReactNode>;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<section className="flex min-h-screen bg-backgound px-4 py-16 md:py-32 dark:bg-transparent">
			{children}
		</section>
	);
}
