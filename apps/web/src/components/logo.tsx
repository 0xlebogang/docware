import { Book } from "lucide-react";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
	return (
		<div className={cn("flex items-center space-x-2", className)}>
			<LogoIcon />
			<span className={cn("font-bold text-lg", className)}>Docware.</span>
		</div>
	);
};

export const LogoIcon = ({ className }: { className?: string }) => {
	return <Book className={cn("w-6 h-6", className)} />;
};
