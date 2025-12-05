"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@repo/better-auth/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import GoogleButton from "@/components/google-button";
import { LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	type CreateUserInput,
	createUserSchema,
} from "@/lib/validation/user-schema";

export default function SignUpForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		getValues,
		setError,
	} = useForm({
		resolver: zodResolver(createUserSchema),
		defaultValues: {
			isLoading: false,
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		resetOptions: {
			keepDefaultValues: true,
		},
		mode: "onSubmit",
	});

	async function onSubmit(data: CreateUserInput) {
		const values = getValues();
		if (values.password !== values.confirmPassword) {
			setError("confirmPassword", {
				type: "value",
				message: "Passwords do not match",
			});
			return;
		}

		const { error } = await signUp.email({
			name: data.fullName,
			email: data.email,
			password: data.password,
		});

		if (error) {
			setError("root", { type: "server", message: error.message });
			return;
		}
		return redirect(process.env.NEXT_PUBLIC_SIGN_IN_URL as string);
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

				{errors.root && (
					<p className="mb-4 rounded-md p-3 text-sm text-red-700">
						{errors.root.message?.toString()}
					</p>
				)}

				<div className="space-y-6">
					<div className="space-y-2">
						<div className="w-full flex justify-between items-center">
							<Label htmlFor="fullName" className="block text-sm">
								Full Name
							</Label>
							{errors.fullName && (
								<p className="text-xs text-destructive">
									{errors.fullName.message}
								</p>
							)}
						</div>
						<Input
							{...register("fullName")}
							type="text"
							required
							id="fullName"
						/>
					</div>

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
						<Input {...register("email")} type="text" required id="email" />
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
							{...register("password")}
							type="password"
							required
							id="password"
						/>
					</div>
					<div className="space-y-2">
						<div className="w-full flex justify-between items-center">
							<Label htmlFor="confirmPassword" className="block text-sm">
								Confirm Password
							</Label>
							{errors.confirmPassword && (
								<p className="text-xs text-destructive">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>
						<Input
							{...register("confirmPassword", {})}
							type="password"
							required
							id="confirmPassword"
						/>
					</div>

					<Button disabled={isSubmitting} type="submit" className="w-full">
						{isSubmitting ? "Loading..." : "Continue"}
					</Button>
				</div>
			</div>

			<p className="text-accent-foreground text-center text-sm">
				Already have an account ?
				<Button asChild variant="link" className="px-2">
					<Link href={process.env.NEXT_PUBLIC_SIGN_IN_URL || "#"}>Sign In</Link>
				</Button>
			</p>
		</form>
	);
}
