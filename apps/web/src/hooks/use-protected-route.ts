"use client";

import { usePathname } from "next/navigation";
import { protectedRoutes } from "@/lib/constants";

export function useProtectedRoute() {
	const pathname = usePathname();
	return {
		isProtected: protectedRoutes.includes(pathname),
	};
}
