import type { db as dbClient } from "@repo/database";
import type { Project, ProjectInput } from "@repo/database/types";
import { BaseLayer } from "@/lib/base-layer";

export class ProjectRepository extends BaseLayer {
	private organizationId: string;

	constructor(
		protected readonly db: typeof dbClient,
		userID: string,
		organizationId: string,
	) {
		super(userID);
		this.db = db;
		this.organizationId = organizationId;
	}

	async getAll(): Promise<Project[]> {
		return await this.db.project.findMany({
			where: {
				userId: this.getUserID(),
				organizationId: this.organizationId,
			},
		});
	}

	async getByID(id: string): Promise<Project | null> {
		return await this.db.project.findFirst({
			where: {
				id,
				userId: this.getUserID(),
				organizationId: this.organizationId,
			},
		});
	}

	async create(data: ProjectInput): Promise<Project> {
		return await this.db.project.create({
			data: {
				...data,
				userId: this.getUserID(),
				organizationId: this.organizationId,
			},
		});
	}

	async delete(id: string): Promise<boolean> {
		const record = await this.getByID(id);
		if (!record) {
			return false;
		}

		await this.db.project.delete({
			where: {
				id,
				organizationId: this.organizationId,
			},
		});
		return true;
	}
}
