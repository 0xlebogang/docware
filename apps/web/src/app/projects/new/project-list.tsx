"use client";

import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import Link from "next/link";
import { useProjectStore } from "@/stores/projects-store";

export default function ProjectList() {
	const projects = useProjectStore((state) => state.projects);

	return (
		<>
			{projects.map((project) => (
				<Link href={`/project/${project.id}`} key={project.id}>
					<Card>
						<CardHeader>
							<CardTitle>{project.name}</CardTitle>
							<CardDescription>
								{project.description ?? "No description"}
							</CardDescription>
							<CardFooter>
								<p className="text-sm text-muted-foreground">
									Last updated:{" "}
									{new Date(project.updatedAt).toLocaleDateString()}
								</p>
							</CardFooter>
						</CardHeader>
					</Card>
				</Link>
			))}
		</>
	);
}
