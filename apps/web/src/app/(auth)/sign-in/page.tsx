import { LogoIcon } from "@repo/components/components/logo";
import GoogleButton from "@repo/components/google-button";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function SignIn() {
	return (
		<form action="" className="max-w-92 m-auto h-fit w-full">
			<div className="p-6 h-[calc(100vh-66px)] flex flex-col justify-center">
				<div>
					<Link href="/" aria-label="go home">
						<LogoIcon />
					</Link>
					<h1 className="mb-1 mt-4 text-xl font-semibold">
						Sign In to Docware
					</h1>
					<p>Welcome back! Sign in to continue</p>
				</div>

				<div className="mt-6">
					<GoogleButton />
				</div>

				<div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
					<hr className="border-dashed" />
					<span className="text-muted-foreground text-xs">
						or continue with
					</span>
					<hr className="border-dashed" />
				</div>

				<div className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="email" className="block text-sm">
							Email
						</Label>
						<Input type="email" required name="email" id="email" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="password" className="block text-sm">
							Password
						</Label>
						<Input type="password" required name="password" id="password" />
					</div>

					<Button className="w-full">Continue</Button>
				</div>

				<p className="text-muted-foreground text-center text-sm mt-4">
					Don't have an account ?
					<Button asChild variant="link" className="px-2">
						<Link href="#">Create one</Link>
					</Button>
				</p>
				<Button asChild variant="link" className="absolute top-6 left-6">
					<Link href={process.env.NEXT_PUBLIC_SITE_URL || "#link"}>
						<ChevronLeft />
						<span>Back to Home</span>
					</Link>
				</Button>
			</div>
		</form>
	);
}
