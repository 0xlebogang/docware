import type { Organization } from "@repo/database/types";
import { headers } from "next/headers";
import Link from "next/link";
import { api } from "@/lib/api-client";

export default async function Organizations() {
	const headersList = await headers();
	const res = await api.orgs.$get(
		{},
		{ headers: Object.fromEntries(headersList) },
	);

	const { data: orgs }: { data: Organization[] } = await res.json();

	return (
		<section className="grid auto-rows-min gap-4 md:grid-cols-3">
			{orgs.map((org, i) => (
				<Link
					href={`/organizations/${org.id}`}
					key={i}
					className="p-4 border border-border rounded-md hover:shadow-md transition-shadow"
				>
					<h2 className="text-lg font-semibold mb-2">{org.name}</h2>
					<p className="text-sm text-muted-foreground">
						{org.description || "No description provided."}
					</p>
				</Link>
			))}
		</section>
	);
}
