"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@repo/auth/client";
import { LogoIcon } from "@repo/components/components/logo";
import GoogleButton from "@repo/components/google-button";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { toast } from "@repo/ui/components/sonner";
import { Spinner } from "@repo/ui/components/spinner";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { type SignInInput, SignInSchema } from "@/lib/validation/auth";

export default function SignIn() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
		resetOptions: {
			keepDefaultValues: true,
		},
		resolver: zodResolver(SignInSchema),
	});

	if (errors.root?.message) {
		toast.error(errors.root.message);
	}

	async function onSubmit(formData: SignInInput) {
		const { data, error } = await authClient.signIn.email({
			...formData,
		});

		if (error) {
			setError("root", {
				message:
					error.message ||
					"An unexpected error occured. Please try again later.",
			});

			toast.error(errors.root?.message);
			return;
		}

		toast.success(`Authenticated as ${data.user.email}`);
		return redirect(
			process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3000",
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
						<Input type="email" required {...register("email")} id="email" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="password" className="block text-sm">
							Password
						</Label>
						<Input
							type="password"
							required
							{...register("password")}
							id="password"
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

				<p className="text-muted-foreground text-center text-sm mt-4">
					Don't have an account ?
					<Button asChild variant="link" className="px-2">
						<Link href={process.env.NEXT_PUBLIC_SIGN_UP_URL || "/sign-up"}>
							Create one
						</Link>
					</Button>
				</p>
			</div>
		</form>
	);
}
