"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@repo/ui/components/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@repo/ui/components/sidebar";
import { Skeleton } from "@repo/ui/components/skeleton";
import { toast } from "@repo/ui/components/sonner";
import { ChevronsUpDown, Folder, PlusCircle, Users } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useOrganizationStore } from "@/stores/organizations-store";
import { useProjectStore } from "@/stores/projects-store";

export function NavOrg() {
	const { isMobile } = useSidebar();
	const {
		activeOrganization,
		organizations,
		isLoading,
		fetchAndInitializeOrganizations,
		setActiveOrganization,
	} = useOrganizationStore();

	const { projects, getProjects } = useProjectStore();

	React.useEffect(() => {
		fetchAndInitializeOrganizations().catch((_) =>
			toast.error("Error fetching organizations"),
		);

		if (activeOrganization?.id) getProjects(activeOrganization.id);
	}, [fetchAndInitializeOrganizations, getProjects, activeOrganization?.id]);

	const orgs = organizations.filter((org) => org.id !== activeOrganization?.id);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						{isLoading ? (
							<SidebarMenuButton size="lg" asChild>
								<Skeleton className="w-full h-16" />
							</SidebarMenuButton>
						) : (
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarFallback className="rounded-lg bg-accent">
										{activeOrganization?.name.charAt(0).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{activeOrganization?.name}
									</span>
									<span className="truncate text-muted-foreground text-xs">
										{activeOrganization?.description}
									</span>
								</div>
								<ChevronsUpDown className="ml-auto size-4" />
							</SidebarMenuButton>
						)}
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Folder className="h-5" />
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate text-muted-foreground text-xs">
										{projects.length} Projects
									</span>
								</div>
							</div>
							<DropdownMenuSeparator />
						</DropdownMenuLabel>
						<DropdownMenuItem className="font-normal text-sm">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Users className="h-5" />
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate text-xs">
										{activeOrganization?.members.length} Members
									</span>
								</div>
							</div>
						</DropdownMenuItem>
						{orgs.length > 0 && (
							<>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									{orgs.map((org, i) => (
										<DropdownMenuItem
											key={`${org.name}-${i}`}
											onClick={() => setActiveOrganization(org)}
										>
											<Avatar className="h-5 w-5 rounded-lg">
												<AvatarImage
													src={org.avatar || undefined}
													alt={org.name}
												/>
												<AvatarFallback className="rounded-lg bg-accent">
													{org.name.charAt(0).toUpperCase()}
												</AvatarFallback>
											</Avatar>
											{org.name}
										</DropdownMenuItem>
									))}
								</DropdownMenuGroup>
							</>
						)}

						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Link href="/organizations/new">
								<PlusCircle className="size-4" />
								<span>Add Organization</span>
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
