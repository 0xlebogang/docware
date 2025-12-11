"use client";

import type { User } from "@repo/auth/utils";
import * as React from "react";
import { client } from "@/lib/auth-client";

export function useUser() {
	const [user, setUser] = React.useState<User>();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | undefined>();

	React.useEffect(() => {
		async function fetchUser() {
			setIsLoading(true);
			const { data, error } = await client.getSession();
			if (error) {
				setError(error?.message);
				setIsLoading(false);
				return;
			}

			setUser(data?.user);
			setIsLoading(false);
		}
		fetchUser();
	}, []);

	return {
		user,
		isLoading,
		error,
	};
}
