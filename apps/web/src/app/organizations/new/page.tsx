"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Organization, OrganizationInput } from "@repo/database/types";
import { OrganizationInputSchema } from "@repo/database/validation";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { toast } from "@repo/ui/components/sonner";
import { Spinner } from "@repo/ui/components/spinner";
import { Textarea } from "@repo/ui/components/textarea";
import { Building, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api-client";
import { useOrganizationStore } from "@/stores/organizations-store";

export default function NewOrganization() {
	const { addOrganization } = useOrganizationStore();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			name: "",
			description: "",
		} as OrganizationInput,
		resolver: zodResolver(OrganizationInputSchema),
		mode: "onBlur",
		resetOptions: {
			keepIsValid: true,
		},
	});

	async function onSubmit(data: OrganizationInput) {
		const res = await api.orgs.create.$post({
			json: {
				...data,
			},
		});

		if (res.status !== 201) {
			toast.error("Failed to create organization. Please try again.");
			return;
		}

		if (errors.root) {
			toast.error(`Error: ${errors.root?.message}`);
		}

		const { data: newOrg }: { data: Organization } = await res.json();
		addOrganization(newOrg);

		toast.success("Organization created successfully!");
		return redirect("/", RedirectType.push);
	}

	return (
		<section className="flex bg-background px-4 dark:bg-transparent">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="max-w-92 m-auto h-fit w-full"
			>
				<div className="p-6 h-[calc(100vh-66px)] flex flex-col justify-center">
					<div className="mb-8">
						<Building />
						<h1 className="mb-1 mt-4 text-xl font-semibold">
							Add Organization
						</h1>
						<p>Create a new organization</p>
					</div>

					<div className="space-y-6">
						<div className="space-y-2">
							<div className="flex justify-between w-full">
								<Label htmlFor="name" className="block text-sm">
									Name
								</Label>
								{errors.name && (
									<p className="text-sm text-red-600">
										{errors.name.message?.toString()}
									</p>
								)}
							</div>
							<Input type="text" required {...register("name")} id="name" />
						</div>
						<div className="space-y-2">
							<div className="flex justify-between w-full">
								<Label htmlFor="description" className="block text-sm">
									Description
								</Label>
								{errors.description && (
									<p className="text-sm text-red-600">
										{errors.description.message?.toString()}
									</p>
								)}
							</div>
							<Textarea
								placeholder="A description for your new organization..."
								{...register("description")}
								id="description"
							/>
						</div>

						<Button
							type="submit"
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
					<Button
						asChild
						variant="link"
						className="text-muted-foreground text-center text-sm mt-4"
					>
						<Link href="/">
							<ChevronLeft className="h-4 w-4" />
							Back to dashboard
						</Link>
					</Button>
				</div>
			</form>
		</section>
	);
}
