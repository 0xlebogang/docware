import type { Organization } from "@repo/database/types";
import { toast } from "@repo/ui/components/sonner";
import { create } from "zustand";
import { api } from "@/lib/api-client";

export type OrganizationsState = {
	activeOrganization: Organization | null;
	organizations: Organization[];
	isLoading: boolean;
	setActiveOrganization: (orgId: string) => void;
	fetchAndInitializeOrganizations: () => Promise<void>;
};

export const useOrganizationStore = create<OrganizationsState>((set) => ({
	activeOrganization: null,
	organizations: [],
	isLoading: false,

	setActiveOrganization: (orgId: string) => {
		set((state) => {
			const organization =
				state.organizations.find((org) => org.id === orgId) || null;
			return { activeOrganization: organization };
		});
	},

	fetchAndInitializeOrganizations: async () => {
		set({ isLoading: true });
		try {
			const res = await api.orgs.$get();
			const { data: orgs }: { data: Organization[] } = await res.json();

			set({
				organizations: orgs,
				activeOrganization: orgs.length > 0 ? orgs[0] : null,
				isLoading: false,
			});
		} catch (_error) {
			toast.error("Failed to load organizations");
		} finally {
			set({ isLoading: false });
		}
	},
}));
