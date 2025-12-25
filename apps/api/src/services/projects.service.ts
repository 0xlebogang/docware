import type { db as dbClient } from "@repo/database";
import type { Project, ProjectInput } from "@repo/database/types";
import type { storage as StorageProvider } from "@/lib/storage-provider";
import { ProjectRepository } from "../repositories/projects.repo";

export class ProjectService extends ProjectRepository {
	constructor(
		protected readonly db: typeof dbClient,
		private readonly storage: typeof StorageProvider,
		userID: string,
		organizationId: string,
	) {
		super(db, userID, organizationId);
	}

	async getAll(): Promise<Project[]> {
		try {
			return await super.getAll();
		} catch (error) {
			console.error("Error fetching projects:", error);
			throw new Error("Failed to get projects");
		}
	}

	async getByID(id: string): Promise<Project | null> {
		try {
			return await super.getByID(id);
		} catch (error) {
			console.error(`Error fetching project with ID ${id}:`, error);
			throw new Error("Failed to get project by ID");
		}
	}

	async create(data: ProjectInput): Promise<Project> {
		try {
			const record = await super.create(data);
			const folderName = `project-${record.id}`;
			const success = await this.storage.createFolder(folderName);

			// Rollback the project creation if folder creation fails
			if (!success) {
				await this.delete(record.id);
			}

			return record;
		} catch (error) {
			console.error("Error creating project:", error);
			throw new Error("Failed to create project");
		}
	}

	async delete(id: string): Promise<boolean> {
		try {
			const folderName = `project-${id}`;
			const success = await this.storage.deleteFolder(folderName);

			// Throw an error if folder deletion fails
			if (!success) {
				throw new Error();
			}

			return await super.delete(id);
		} catch (error) {
			console.error(`Error deleting project with ID ${id}:`, error);
			throw new Error("Failed to delete project");
		}
	}
}
