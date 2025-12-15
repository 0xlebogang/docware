import { auth } from "@repo/auth/server";
import Providers from "@/components/providers";
import "@repo/tailwindcss/main.css";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@repo/ui/components/sidebar";
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
						<SidebarInset>
							<header className="flex h-16 shrink-0 items-center gap-2">
								<div className="flex items-center gap-2 px-4">
									<SidebarTrigger className="-ml-1" />
								</div>
							</header>
							<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
								{children}
							</div>
						</SidebarInset>
					</SidebarProvider>
				</body>
			</Providers>
		</html>
	);
}
