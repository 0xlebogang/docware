import Footer from "@repo/components/footer";
import { Navbar } from "@repo/components/navbar";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "@repo/ui/globals.css";

const fontSans = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
			>
				<Providers>
					<Navbar />
					<section className="flex min-h-screen bg-backgound px-4 py-16 md:py-32 dark:bg-transparent">
						{children}
					</section>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
