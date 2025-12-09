import "@repo/tailwindcss/main.css";
import Navbar from "@repo/components/navbar";

export interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<Navbar />
			<body>{children}</body>
		</html>
	);
}
