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
import { ChevronsUpDown, User, Users } from "lucide-react";

export function NavOrg({
	currentOrganization,
	organizations,
}: {
	currentOrganization: {
		name: string;
		description: string;
		tier: string;
		members?: number;
		avatar: string;
	};
	organizations?: {
		name: string;
		tier: string;
		avatar: string;
	}[];
}) {
	const { isMobile } = useSidebar();

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
								<AvatarImage
									src={currentOrganization.avatar}
									alt={currentOrganization.name}
								/>
								<AvatarFallback className="rounded-lg bg-accent">
									{currentOrganization.name.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									{currentOrganization.name}
								</span>
								<span className="truncate text-xs">
									{currentOrganization.tier}
								</span>
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
									<span className="truncate font-bold">
										{currentOrganization.tier} Plan
									</span>
									<span className="truncate text-xs">
										{currentOrganization.description}
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
										{currentOrganization.members} Members
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
											<Avatar className="h-5 w-5">
												<AvatarImage src={org.avatar} alt={org.name} />
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
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
