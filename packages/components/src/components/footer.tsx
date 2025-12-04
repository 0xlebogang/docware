import {
	Facebook,
	Instagram,
	Linkedin,
	TicketCheckIcon,
	Twitter,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Link } from "./link";

const links = [
	{
		title: "Features",
		href: "#",
	},
	{
		title: "Solution",
		href: "#",
	},
	{
		title: "Customers",
		href: "#",
	},
	{
		title: "Pricing",
		href: "#",
	},
	{
		title: "Help",
		href: "#",
	},
	{
		title: "About",
		href: "#",
	},
];

export default function FooterSection() {
	return (
		<footer className="py-16 md:py-32">
			<div className="mx-auto max-w-5xl px-6">
				<Link href="/" aria-label="go home" className="mx-auto block size-fit">
					<Logo />
				</Link>

				<div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
					{links.map((link, i) => (
						<Link
							key={`${link.title}-${i}`}
							href={link.href}
							className="text-muted-foreground hover:text-primary block duration-150"
						>
							<span>{link.title}</span>
						</Link>
					))}
				</div>
				<div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
					<Link
						href="#"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="X/Twitter"
						className="text-muted-foreground hover:text-primary block"
					>
						<Twitter />
					</Link>
					<Link
						href="#"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
						className="text-muted-foreground hover:text-primary block"
					>
						<Linkedin />
					</Link>
					<Link
						href="#"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Facebook"
						className="text-muted-foreground hover:text-primary block"
					>
						<Facebook />
					</Link>
					<Link
						href="#"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
						className="text-muted-foreground hover:text-primary block"
					>
						<Instagram />
					</Link>
					<Link
						href="#"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="TikTok"
						className="text-muted-foreground hover:text-primary block"
					>
						<TicketCheckIcon />
					</Link>
				</div>
				<span className="text-muted-foreground block text-center text-sm">
					{" "}
					&copy; {new Date().getFullYear()} Docware, All rights reserved
				</span>
			</div>
		</footer>
	);
}
