import type { Project } from "@repo/database/types";
import { toast } from "@repo/ui/components/sonner";
import { create } from "zustand";
import { api } from "@/lib/api-client";

const organizationIdHeader =
	process.env.ORGANIZATION_ID_HEADER || "X-Organization-ID";

export type ProjectsState = {
	projects: Project[];
	isLoading: boolean;
	getProjects: (organizationId: string) => Promise<void>;
	addProject: (project: Project) => void;
};

export const useProjectStore = create<ProjectsState>((set) => ({
	projects: [],
	isLoading: false,

	getProjects: async (organizationId: string) => {
		set({ isLoading: true });

		try {
			const res = await api.projects.$get(
				{},
				{
					headers: {
						[organizationIdHeader]: organizationId,
					},
				},
			);

			if (!res.ok) {
				toast.error("Failed to load projects. Please try again.");
				return;
			}

			const { data: projects }: { data: Project[] } = await res.json();

			set({ projects });
		} catch (_error) {
			toast.error("An unexpected error occurred while fetching projects.");
		} finally {
			set({ isLoading: false });
		}
	},

	addProject: (project: Project) =>
		set((state) => ({
			projects: [...state.projects, project],
		})),
}));
