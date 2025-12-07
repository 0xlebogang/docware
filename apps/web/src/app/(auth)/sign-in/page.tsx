"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import GoogleButton from "@/components/google-button";
import { LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";
import {
	type SignInUserInput,
	signInUserSchema,
} from "@/lib/validation/user-schema";

export default function SignIn() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(signInUserSchema),
		resetOptions: {
			keepDefaultValues: true,
		},
		mode: "onSubmit",
	});

	async function onSubmit(data: SignInUserInput) {
		const { error } = await signIn.email({
			email: data.email,
			password: data.password,
		});

		if (error) {
			setError("root", { type: "server", message: error.message });
			return;
		}
		return redirect(process.env.NEXT_PUBLIC_DASHBOARD_URL as string);
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-92 m-auto h-fit w-full"
		>
			<div className="p-6">
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

				{errors.root && (
					<p className="mb-4 rounded-md p-3 text-sm text-red-700">
						{errors.root.message}
					</p>
				)}

				<div className="space-y-6">
					<div className="space-y-2">
						<div className="w-full flex justify-between items-center">
							<Label htmlFor="email" className="block text-sm">
								Email
							</Label>
							{errors.email && (
								<p className="text-xs text-destructive">
									{errors.email.message}
								</p>
							)}
						</div>
						<Input type="email" required {...register("email")} id="email" />
					</div>
					<div className="space-y-2">
						<div className="w-full flex justify-between items-center">
							<Label htmlFor="password" className="block text-sm">
								Password
							</Label>
							{errors.password && (
								<p className="text-xs text-destructive">
									{errors.password.message}
								</p>
							)}
						</div>
						<Input
							type="password"
							required
							{...register("password")}
							id="password"
						/>
					</div>

					<Button disabled={isSubmitting} className="w-full">
						{isSubmitting ? "Loading..." : "Continue"}
					</Button>
				</div>
			</div>

			<p className="text-muted-foreground text-center text-sm">
				Don't have an account?
				<Button asChild variant="link" className="px-2">
					<Link href={process.env.NEXT_PUBLIC_SIGN_UP_URL || "#"}>
						Create one
					</Link>
				</Button>
			</p>
		</form>
	);
}
