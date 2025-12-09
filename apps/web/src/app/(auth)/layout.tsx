export interface AuthLayoutProps {
	children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<section className="flex min-h-screen bg-background px-4 dark:bg-transparent">
			{children}
		</section>
	);
}
