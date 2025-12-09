import Providers from "@/components/providers";
import "@repo/tailwindcss/main.css";

export interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<Providers>
				<body>{children}</body>
			</Providers>
		</html>
	);
}
