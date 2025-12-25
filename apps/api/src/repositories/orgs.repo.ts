import type { db as dbClient } from "@repo/database";
import type { Organization, OrganizationInput } from "@repo/database/types";
import { BaseLayer } from "@/lib/base-layer";

export class OrganizationRepository extends BaseLayer {
	constructor(
		protected readonly db: typeof dbClient,
		userID: string,
	) {
		super(userID);

		this.db = db;
	}

	async getAll(): Promise<Organization[]> {
		return await this.db.organization.findMany({
			where: {
				ownerId: this.getUserID(),
			},
			include: {
				projects: true,
			},
		});
	}

	async getByID(id: string): Promise<Organization | null> {
		return await this.db.organization.findFirst({
			where: {
				id,
				ownerId: this.getUserID(),
			},
			include: {
				projects: true,
			},
		});
	}

	async create(data: OrganizationInput): Promise<Organization> {
		return await this.db.organization.create({
			data: {
				...data,
				ownerId: this.getUserID(),
			},
			include: {
				projects: true,
			},
		});
	}

	async update(
		id: string,
		data: Partial<OrganizationInput>,
	): Promise<Organization> {
		return await this.db.organization.update({
			where: {
				id,
				ownerId: this.getUserID(),
			},
			data: {
				...data,
			},
		});
	}

	async delete(id: string): Promise<boolean> {
		const record = await this.getByID(id);
		if (!record) {
			return false;
		}

		await this.db.organization.deleteMany({
			where: {
				id,
				ownerId: this.getUserID(),
			},
		});

		return true;
	}
}
