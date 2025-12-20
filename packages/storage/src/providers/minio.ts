import * as Minio from "minio";
import { BaseStorageProvider } from "@/base-provider";

export class MinioStorageProvider extends BaseStorageProvider {
	private client: Minio.Client;

	constructor(
		endpoint: string,
		port: string,
		accessKey: string,
		secretKey: string,
		useSSL: boolean = false,
		bucketName?: string,
	) {
		super(bucketName);

		this.client = new Minio.Client({
			endPoint: endpoint,
			accessKey,
			port: Number.parseInt(port, 10),
			secretKey,
			useSSL,
		});
	}

	async checkHealth(): Promise<Minio.BucketItemFromList[]> {
		return await this.client.listBuckets();
	}

	async createFolder(folderName: string): Promise<boolean> {
		try {
			await this.client.makeBucket(folderName);
			return true;
		} catch (error) {
			console.error("Error creating folder:", error);
			return false;
		}
	}

	async deleteFolder(folderName: string): Promise<boolean> {
		try {
			await this.client.removeBucket(folderName);
			return true;
		} catch (error) {
			console.error("Error deleting folder:", error);
			return false;
		}
	}

	async folderExists(folderName: string): Promise<boolean> {
		return this.client.bucketExists(folderName);
	}
}
