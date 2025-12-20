import * as Minio from "minio";
import { BaseStorageProvider } from "@/base-provider";

export class MinioStorageProvider extends BaseStorageProvider {
	private client: Minio.Client;

	constructor(
		endpoint: string,
		port: string,
		accessKey: string,
		secretKey: string,
		useSSL: boolean = true,
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

	async createFolder(folderName: string): Promise<void> {
		await this.client.makeBucket(folderName);
	}

	async deleteFolder(folderName: string): Promise<void> {
		await this.client.removeBucket(folderName);
	}

	async folderExists(folderName: string): Promise<boolean> {
		return this.client.bucketExists(folderName);
	}
}
