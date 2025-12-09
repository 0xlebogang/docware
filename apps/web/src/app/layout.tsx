import Providers from "@/components/providers";
import "@repo/tailwindcss/main.css";
import { Toaster } from "@repo/ui/components/sonner";

export interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<Providers>
				<body>
					<Toaster position="top-center" duration={5000} richColors />
					{children}
				</body>
			</Providers>
		</html>
	);
}
