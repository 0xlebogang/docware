import type * as React from "react";

export interface ProtectedPageLayoutProps {
	children: Readonly<React.ReactNode>;
}

export default function ProtectedPageLayout({
	children,
}: ProtectedPageLayoutProps) {
	return (
		<section>
			<h1>Protected Page Layout</h1>
			{children}
		</section>
	);
}
