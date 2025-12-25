import {
	type CreateBucketResponse,
	type GetBucketsResponse,
	Storage,
	type StorageOptions,
} from "@google-cloud/storage";
import { BaseStorageProvider } from "../base-provider";

export class GCSStorageProvider extends BaseStorageProvider {
	private client: Storage;

	constructor(options: StorageOptions) {
		super();
		this.client = new Storage(options);
	}

	async checkHealth(): Promise<GetBucketsResponse> {
		return await this.client.getBuckets();
	}

	async createBucket(bucketName: string): Promise<CreateBucketResponse> {
		try {
			return await this.client.createBucket(bucketName);
		} catch (error) {
			console.error("Error creating bucket:", error);
			throw error;
		}
	}

	async deleteBucket(bucketName: string): Promise<boolean> {
		try {
			await this.client.bucket(bucketName).delete();
			return true;
		} catch (error) {
			console.error("Error deleting bucket:", error);
			return false;
		}
	}

	async bucketExists(bucketName: string): Promise<boolean> {
		return (await this.client.bucket(bucketName).exists())[0];
	}

	async createFolder(bucketName: string, folderName: string): Promise<boolean> {
		try {
			await this.client.bucket(bucketName).file(`${folderName}/`).save("");
			return true;
		} catch (error) {
			console.error("Error creating folder:", error);
			return false;
		}
	}

	async deleteFolder(bucketName: string, folderName: string): Promise<boolean> {
		try {
			await this.client.bucket(bucketName).file(`${folderName}/`).delete();
			return true;
		} catch (error) {
			console.error("Error deleting folder:", error);
			return false;
		}
	}

	async folderExists(bucketName: string, folderName: string): Promise<boolean> {
		return (
			await this.client.bucket(bucketName).file(`${folderName}/`).exists()
		)[0];
	}
}
