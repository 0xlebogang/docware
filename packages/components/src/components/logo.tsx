import { cn } from "@repo/ui/lib/utils";
import { Book } from "lucide-react";
import type { ClassNameValue } from "tailwind-merge";

export interface LogoProps {
	className?: ClassNameValue[];
}

export function Logo({ className }: LogoProps) {
	return (
		<div className={cn("flex items-center gap-2", className)}>
			<LogoIcon />
			<span>Docware</span>
		</div>
	);
}

export function LogoIcon() {
	return <Book />;
}
