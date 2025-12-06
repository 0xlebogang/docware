import type * as React from "react";
import AppSidebar from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export interface ProtectedPageLayoutProps {
	children: Readonly<React.ReactNode>;
}

export default function ProtectedPageLayout({
	children,
}: ProtectedPageLayoutProps) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>{children}</SidebarInset>
		</SidebarProvider>
	);
}
