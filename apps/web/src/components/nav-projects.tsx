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

export interface Project {
	name: string;
	url: string;
	avatar: string;
}

const projects: Project[] = [
	{
		name: "Design Engineering",
		url: "#",
		avatar: "avatars/project-1.jpg",
	},
	{
		name: "Sales & Marketing",
		url: "#",
		avatar: "avatars/project-2.jpg",
	},
	{
		name: "Travel",
		url: "#",
		avatar: "avatars/project-3.jpg",
	},
];

export function NavProjects() {
	const { isMobile } = useSidebar();

	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Projects</SidebarGroupLabel>
			<SidebarMenu>
				{projects.slice(0, 4).map((item) => (
					<SidebarMenuItem key={item.name}>
						<SidebarMenuButton asChild>
							<a href={item.url}>
								<Avatar className="h-6 w-6 rounded-lg">
									<AvatarImage src={item.avatar} alt={item.name} />
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
				{projects.length > 4 && (
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
