import type { Organization } from "@repo/database/types";
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
import { ChevronsUpDown, PlusCircle, User, Users } from "lucide-react";
import Link from "next/link";

export function NavOrg({ organizations }: { organizations?: Organization[] }) {
	const { isMobile } = useSidebar();

	const activeOrganization = {
		name: "Acme Inc",
		description: "For enterprise teams",
		members: Array(42).fill(null),
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarFallback className="rounded-lg bg-accent">
									{activeOrganization.name.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									{activeOrganization.name}
								</span>
								<span className="truncate text-xs">Enterprise Plan</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center p-2">
									<User />
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-bold">Enterprise Plan</span>
									<span className="truncate text-xs">
										{activeOrganization.description}
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
										{activeOrganization.members.length} Members
									</span>
								</div>
							</div>
						</DropdownMenuItem>
						{organizations && (
							<>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									{organizations.map((org, i) => (
										<DropdownMenuItem key={`${org.name}-${i}`}>
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
