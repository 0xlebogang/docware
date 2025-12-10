import { DM_Mono, DM_Sans } from "next/font/google";
import { headers } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { checkAuthStatus } from "@/lib/utils";
import "@repo/tailwindcss/main.css";

export const fontSans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const fontMono = DM_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
	weight: "400",
});

export interface AuthLayoutProps {
	children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
			>
				<ThemeProvider enableSystem defaultTheme="system" attribute="class">
					<section className="flex min-h-screen bg-background px-4 dark:bg-transparent">
						{children}
					</section>
				</ThemeProvider>
			</body>
		</html>
	);
}
