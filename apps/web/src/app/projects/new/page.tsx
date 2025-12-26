"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Project, ProjectInput } from "@repo/database/types";
import { ProjectInputSchema } from "@repo/database/validation";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { toast } from "@repo/ui/components/sonner";
import { Spinner } from "@repo/ui/components/spinner";
import { Textarea } from "@repo/ui/components/textarea";
import { ChevronLeft, Folder } from "lucide-react";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api-client";
import { ORGANIZAION_API_HEADER } from "@/lib/constants";
import { useOrganizationStore } from "@/stores/organizations-store";
import { useProjectStore } from "@/stores/projects-store";

export default function NewProject() {
	const { addProject } = useProjectStore();
	const activeOrganizationId = useOrganizationStore(
		(state) => state.activeOrganization?.id,
	);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			name: "",
			description: "",
		} as ProjectInput,
		resolver: zodResolver(ProjectInputSchema),
		mode: "onBlur",
		resetOptions: {
			keepIsValid: true,
		},
	});

	async function onSubmit(data: ProjectInput) {
		try {
			console.log("Submitting data:", data);
			const res = await api.projects.create.$post(
				{
					json: {
						...data,
					},
				},
				{
					headers: {
						[ORGANIZAION_API_HEADER]: activeOrganizationId || "",
					},
				},
			);

			if (!res.ok) {
				toast.error("Failed to create project. Please try again.");
				return;
			}

			const { data: project }: { data: Project } = await res.json();
			addProject(project);

			toast.success("Project created successfully!");
		} catch (_error) {
			toast.error("Failed to create project. Please try again.");
			return;
		}

		redirect("/", RedirectType.push);
	}

	return (
		<section className="flex bg-background px-4 dark:bg-transparent">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="max-w-92 m-auto h-fit w-full"
			>
				<div className="p-6 h-[calc(100vh-66px)] flex flex-col justify-center">
					<div className="mb-8">
						<Folder className="h-10 w-10" />
						<h1 className="mb-1 mt-4 text-xl font-semibold">Add Project</h1>
						<p>Create a new project</p>
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
								placeholder="A description for your new project..."
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
