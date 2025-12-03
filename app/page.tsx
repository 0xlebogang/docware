import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col gap-4 items-center justify-center p-24">
			<h1>Welcome to Docware</h1>
			<Button size='sm'>Click Me!</Button>
		</main>
	);
}
