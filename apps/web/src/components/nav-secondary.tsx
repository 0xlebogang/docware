import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import { BookOpen, LifeBuoy, type LucideIcon, Send } from "lucide-react";
import type * as React from "react";

export interface Items {
	title: string;
	url: string;
	icon: LucideIcon;
}
[];

const items: Items[] = [
	{
		title: "Documentation",
		url: "#",
		icon: BookOpen,
	},
	{
		title: "Support",
		url: "#",
		icon: LifeBuoy,
	},
	{
		title: "Feedback",
		url: "#",
		icon: Send,
	},
];

export function NavSecondary({
	...props
}: React.ComponentProps<typeof SidebarGroup>) {
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild size="sm">
								<a href={item.url}>
									<item.icon />
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
