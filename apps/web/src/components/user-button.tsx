"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export interface UserButtonProps {
	name: string;
	className?: string;
	imageUrl: string | null | undefined;
	menuItems?: {
		name: string;
		href: string;
	}[];
}

const defaultUserMenuItems = [
	{ name: "Profile", href: "/profile" },
	{ name: "Settings", href: "/settings" },
];

export default function UserButton({
	name,
	className,
	imageUrl,
	menuItems = defaultUserMenuItems,
}: UserButtonProps) {
	const pathname = usePathname();
	const router = useRouter();

	async function handleSignOut() {
		await signOut({
			fetchOptions: {
				onSuccess(_ctx) {
					router.replace(process.env.NEXT_PUBLIC_LANDING_PAGE_URL as string);
				},
			},
		});
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={cn(className)} asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage src={imageUrl || undefined} />
						<AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 flex flex-col gap-2" align="end">
				{pathname === "/dashboard" ? (
					<DropdownMenuItem asChild>
						<Link href="/">View site</Link>
					</DropdownMenuItem>
				) : (
					<DropdownMenuItem asChild>
						<Link href="/dashboard">Dashboard</Link>
					</DropdownMenuItem>
				)}
				<DropdownMenuSeparator />
				<div>
					{menuItems?.map((item, i) => (
						<DropdownMenuItem asChild key={`${item.name}-${i}`}>
							<Link
								href={item.href}
								className={pathname === item.href ? "text-primary" : ""}
							>
								{item.name}
							</Link>
						</DropdownMenuItem>
					))}
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Button
						onClick={handleSignOut}
						variant="destructive"
						className="w-full"
					>
						Sign out
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
