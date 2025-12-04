import { cn } from "@repo/shadcn/lib/utils";
import { Book } from "lucide-react";

export const Logo = ({
	className,
	uniColor,
}: {
	className?: string;
	uniColor?: boolean;
}) => {
	return (
		<div className={cn("flex items-center space-x-2", className)}>
			<LogoIcon />
			<span
				className={cn(
					"font-bold text-lg",
					uniColor ? "text-current" : "text-foreground",
				)}
			>
				Docware
			</span>
		</div>
	);
};

export const LogoIcon = ({ className }: { className?: string }) => {
	return <Book className={cn("w-6 h-6", className)} />;
};
