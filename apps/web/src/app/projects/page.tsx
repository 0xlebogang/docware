import { Button } from "@repo/ui/components/button";
import Link from "next/link";
import ProjectList from "./new/project-list";

export default function Projects() {
	return (
		<div className="grid auto-rows-min gap-4 md:grid-cols-3">
			<div className="col-span-full w-full space-y-8 p-4">
				<div className="flex w-full items-center justify-between">
					<h1 className="font-bold text-4xl">My Projects</h1>
					<Button asChild>
						<Link href="/projects/new">New Project</Link>
					</Button>
				</div>
			</div>
			<ProjectList />
		</div>
	);
}
