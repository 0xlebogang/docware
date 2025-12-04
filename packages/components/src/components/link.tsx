import { Slot } from "@radix-ui/react-slot";
import { cn } from "@repo/ui/lib/utils";
import * as React from "react";

// extend react anchor attributes
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	asChild?: boolean;
}

/**
 * A customizable Link component that can render as a standard anchor tag or as a child component.
 * to allow passing in custom Link implementations (e.g., Next.js Link).
 *
 * @param {boolean} asChild - If true, renders the Link as a child component using Slot.
 * @param {string} className - Additional CSS classes to apply to the Link.
 * @param {object} props - Other anchor HTML attributes.
 *
 * @returns {JSX.Element} The rendered Link component.
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
	({ asChild = false, className, ...props }, ref) => {
		const Component = asChild ? Slot : "a";
		return (
			<Component
				ref={ref}
				className={cn("underline-offset-4", className)}
				{...props}
			/>
		);
	},
);

Link.displayName = "Link";
