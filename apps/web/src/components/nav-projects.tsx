"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@repo/ui/components/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@repo/ui/components/sidebar";
import { Folder, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useOrganizationStore } from "@/stores/organizations-store";
import { useProjectStore } from "@/stores/projects-store";

export interface Project {
	id: string;
	name: string;
	description: string | null;
	siteUrl: string | null;
	folderPath: string | null;
	createdAt: Date;
	updatedAt: Date;
	organizationId: string;
	userId: string | null;
}

export function NavProjects() {
	const { isMobile } = useSidebar();
	const { projects, getProjects } = useProjectStore();
	const activeOrganization = useOrganizationStore(
		(state) => state.activeOrganization,
	);

	React.useEffect(() => {
		if (activeOrganization) {
			getProjects(activeOrganization.id);
		}
	}, [getProjects, activeOrganization]);

	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Projects</SidebarGroupLabel>
			<SidebarMenu>
				{projects.length === 0 && (
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Link
								href="/projects/new"
								className="text-muted-foreground text-xs"
							>
								+ Create your first project
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				)}
				{projects.slice(0, 4).map((item) => (
					<SidebarMenuItem key={item.id}>
						<SidebarMenuButton asChild>
							<a href={item.siteUrl ?? "#"}>
								<Avatar className="h-6 w-6 rounded-lg">
									<AvatarImage
										src={item.folderPath ?? undefined}
										alt={item.name}
									/>
									<AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
								</Avatar>
								<span>{item.name}</span>
							</a>
						</SidebarMenuButton>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuAction showOnHover>
									<MoreHorizontal />
									<span className="sr-only">More</span>
								</SidebarMenuAction>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-48"
								side={isMobile ? "bottom" : "right"}
								align={isMobile ? "end" : "start"}
							>
								<DropdownMenuItem>
									<Folder className="text-muted-foreground" />
									<span>View Project</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Trash2 className="text-muted-foreground" />
									<span>Delete Project</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				))}
				{projects.length > 1 && (
					<SidebarMenuItem>
						<SidebarMenuButton>
							<MoreHorizontal className="h-5" />
							<span>More</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				)}
			</SidebarMenu>
		</SidebarGroup>
	);
}
