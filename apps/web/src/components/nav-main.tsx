import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import { Settings, Users } from "lucide-react";
import Link from "next/link";

export function NavManagement() {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Management</SidebarGroupLabel>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link href="#/members">
							<Users />
							<span>Members</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link href="#/settings">
							<Settings />
							<span>Settings</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	);
}
