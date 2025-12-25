import {
	type CreateBucketResponse,
	type GetBucketsResponse,
	Storage,
	type StorageOptions,
} from "@google-cloud/storage";
import { BaseStorageProvider } from "../base-provider";

export class GCSStorageProvider extends BaseStorageProvider {
	private client: Storage;
	private _prefix?: string;

	constructor(options: StorageOptions, prefix?: string) {
		super();
		this._prefix = prefix;
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

	async deleteBucket(_bucketName: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	async bucketExists(_bucketName: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	async createFolder(folderName: string): Promise<boolean> {
		try {
			await this.client.createBucket(folderName);
			return true;
		} catch (error) {
			console.error("Error creating folder:", error);
			return false;
		}
	}

	async deleteFolder(folderName: string): Promise<boolean> {
		try {
			await this.client.bucket(folderName).delete();
			return true;
		} catch (error) {
			console.error("Error deleting folder:", error);
			return false;
		}
	}

	async folderExists(folderName: string): Promise<boolean> {
		return (await this.client.bucket(folderName).exists())[0];
	}
}
