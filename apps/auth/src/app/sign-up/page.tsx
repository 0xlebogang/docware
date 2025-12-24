"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LogoIcon } from "@repo/components/logo";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { toast } from "@repo/ui/components/sonner";
import { Spinner } from "@repo/ui/components/spinner";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import GoogleButton from "@/components/google-button";
import { client } from "@/lib/auth-client";
import { type SignUpInput, SignUpSchema } from "@/lib/validation/auth";

export default function SignUp() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		resolver: zodResolver(SignUpSchema),
	});

	async function onSubmit(formData: SignUpInput) {
		const { error } = await client.signUp.email({
			name: formData.name,
			email: formData.email,
			password: formData.password,
		});

		if (error) {
			setError("root", {
				message:
					error?.message ||
					"An unexpected error occured! Please tray again later.",
			});

			toast.error(errors.root?.message);
			return;
		}

		return redirect(
			process.env.NEXT_PUBLIC_SIGN_IN_URL || "/sign-in",
			RedirectType.replace,
		);
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-92 m-auto h-fit w-full"
		>
			<div className="p-6 h-[calc(100vh-66px)] flex flex-col justify-center">
				<Button asChild variant="link" className="absolute top-6 left-6">
					<Link href={process.env.NEXT_PUBLIC_SITE_URL || "#link"}>
						<ChevronLeft />
						<span>Back to Home</span>
					</Link>
				</Button>
				<div>
					<Link href="/" aria-label="go home">
						<LogoIcon />
					</Link>
					<h1 className="mb-1 mt-4 text-xl font-semibold">
						Create a Docware Account
					</h1>
					<p>Welcome! Create an account to get started</p>
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
						<div className="flex justify-between w-full">
							<Label htmlFor="name" className="block text-sm">
								Full Name
							</Label>
							{errors.name && (
								<span className="text-xs text-destructive">
									{errors.name.message}
								</span>
							)}
						</div>
						<Input type="text" required {...register("name")} id="name" />
					</div>
					<div className="space-y-2">
						<div className="flex justify-between w-full">
							<Label htmlFor="email" className="block text-sm">
								Email
							</Label>
							{errors.email && (
								<span className="text-xs text-destructive">
									{errors.email.message}
								</span>
							)}
						</div>
						<Input type="email" required {...register("email")} id="email" />
					</div>
					<div className="space-y-2">
						<div className="flex justify-between w-full">
							<Label htmlFor="password" className="block text-sm">
								Password
							</Label>
							{errors.password && (
								<span className="text-xs text-destructive">
									{errors.password.message}
								</span>
							)}
						</div>
						<Input
							type="password"
							required
							{...register("password")}
							id="password"
						/>
					</div>
					<div className="space-y-2">
						<div className="flex justify-between w-full">
							<Label htmlFor="confirmPassword" className="block text-sm">
								Confirm password
							</Label>
							{errors.confirmPassword && (
								<span className="text-xs text-destructive">
									{errors.confirmPassword.message}
								</span>
							)}
						</div>
						<Input
							type="password"
							required
							{...register("confirmPassword")}
							id="confirmPassword"
						/>
					</div>

					<Button
						disabled={isSubmitting}
						className="w-full flex justify-center items-center gap-2"
					>
						{isSubmitting ? (
							<>
								<Spinner />
								<span>Loading...</span>
							</>
						) : (
							"Continue"
						)}
					</Button>
				</div>

				<p className="text-accent-foreground text-center text-sm">
					Already have an account?
					<Button asChild variant="link" className="px-2">
						<Link href={process.env.NEXT_PUBLIC_SIGN_IN_URL || "/sign-in"}>
							Sign In
						</Link>
					</Button>
				</p>
			</div>
		</form>
	);
}
