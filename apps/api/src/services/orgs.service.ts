import type { db as dbClient } from "@repo/database";
import type { Organization, OrganizationInput } from "@repo/database/types";
import { OrganizationRepository } from "../repositories/orgs.repo";

export class OrganizationService extends OrganizationRepository {
	constructor(
		protected readonly db: typeof dbClient,
		userID: string,
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
		// Create a storage bucket for the organization

		try {
			return await super.create(data);
		} catch (error) {
			console.error("Error creating storage bucket for organization:", error);
			throw new Error("Failed to create storage bucket for organization");
		}
	}

	async delete(id: string): Promise<boolean> {
		return await super.delete(id);
	}
}
