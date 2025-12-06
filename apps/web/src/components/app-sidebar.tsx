import { Calendar, Home, Inbox } from "lucide-react";
import { Logo } from "./logo";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./ui/sidebar";

export default function AppSidebar() {
	return (
		<Sidebar variant="inset" collapsible="offcanvas">
			<SidebarHeader className="px-2">
				<div className="flex items-center px-2 py-1.5">
					<Logo />
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Organizations</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{/* List up to 4 of user's organizations */}
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/">
										<Home />
										<span>Home</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/">
										<Inbox />
										<span>Inbox</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/">
										<Calendar />
										<span>Calendar</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Recent Projects</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{/* List up to 4 of user's most recent projects */}
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/">
										<Home />
										<span>Home</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/">
										<Inbox />
										<span>Inbox</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/">
										<Calendar />
										<span>Calendar</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
