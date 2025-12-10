"use client";

import { authClient } from "@repo/auth/client";
import * as React from "react";

export function useAuth(pathname: string) {
	const [session, setSession] = React.useState<unknown>({});
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<Error | null>(null);

	React.useEffect(() => {
		async function fetchSession() {
			setLoading(true);
			try {
				const currentSession = await authClient.getSession();
				setSession(currentSession);
			} catch (error) {
				console.error("Error fetching session:", error);
				setError(error as Error);
			} finally {
				setLoading(false);
			}
		}

		fetchSession();
	}, [pathname]);

	return { session, isLoading: loading, error };
}
