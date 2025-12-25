import type { db as dbClient } from "@repo/database";
import type { Organization, OrganizationInput } from "@repo/database/types";
import type { storage as StorageProvider } from "@/lib/storage-provider";
import { OrganizationRepository } from "../repositories/orgs.repo";

export class OrganizationService extends OrganizationRepository {
	constructor(
		protected readonly db: typeof dbClient,
		userID: string,
		private readonly storage: typeof StorageProvider,
	) {
		super(db, userID);
	}

	async getAll(): Promise<Organization[]> {
		try {
			return await super.getAll();
		} catch (error) {
			console.error("Error fetching organizations:", error);
			throw new Error("Failed to get organizations");
		}
	}

	async getByID(id: string): Promise<Organization | null> {
		try {
			return await super.getByID(id);
		} catch (error) {
			console.error(`Error fetching organization with ID ${id}:`, error);
			throw new Error("Failed to get organization by ID");
		}
	}

	async create(data: OrganizationInput): Promise<Organization> {
		try {
			const record = await super.create(data);
			const bucketName = `org-${record.id}`;
			const success = await this.storage.createBucket(bucketName);

			// Rollback the organization creation if bucket creation fails
			if (!success) {
				await this.delete(record.id);
			}

			return record;
		} catch (error) {
			console.error("Error creating storage bucket for organization:", error);
			throw new Error("Failed to create storage bucket for organization");
		}
	}

	async delete(id: string): Promise<boolean> {
		try {
			const bucketName = `org-${id}`;
			const success = await this.storage.deleteFolder(bucketName);

			// Throw an error if bucket deletion fails
			if (!success) {
				throw new Error();
			}

			return await super.delete(id);
		} catch (error) {
			console.error("Error deleting storage bucket for organization:", error);
			throw new Error("Failed to delete storage bucket for organization");
		}
	}
}
