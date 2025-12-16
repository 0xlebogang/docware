import type { Organization } from "@repo/database/types";
import * as React from "react";
import { api } from "@/lib/api-client";

export function useOrganizations() {
	const [organizations, setOrganizations] = React.useState<Organization[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		async function fetchOrganizations() {
			setIsLoading(true);
			try {
				const res = await api.orgs.$get();

				if (res.status !== 200) {
					setError("Failed to fetch organizations.");
					return;
				}

				const { data }: { data: Organization[] } = await res.json();
				setOrganizations(data);
			} catch (_error) {
				setError("An unexpected error occurred.");
			} finally {
				setIsLoading(false);
			}
		}

		fetchOrganizations();
	}, []);

	return { organizations, isLoading, error };
}
