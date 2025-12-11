import { auth } from "@repo/auth/server";
import Providers from "@/components/providers";
import "@repo/tailwindcss/main.css";
import { Dialog } from "@repo/ui/components/dialog";
import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";
import { Toaster } from "@repo/ui/components/sonner";
import { headers } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";

export interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return redirect(
			process.env.NEXT_PUBLIC_SIGN_IN_URL || "http://localhost:3001/sign-in",
			RedirectType.push,
		);
	}

	return (
		<html lang="en" suppressHydrationWarning>
			<Providers>
				<body>
					<Toaster position="top-center" duration={5000} richColors />
					<SidebarProvider>
						<AppSidebar />
						<SidebarInset>{children}</SidebarInset>
					</SidebarProvider>
				</body>
			</Providers>
		</html>
	);
}
