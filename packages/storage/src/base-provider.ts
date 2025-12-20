/**
 * BaseStorageProvider serves as an abstract class for different storage providers.
 */
export abstract class BaseStorageProvider {
	protected bucketName?: string;

	// Initialize the storage provider with a specific bucket name.
	constructor(bucketName?: string) {
		this.bucketName = bucketName;
	}

	/**
	 * Checks the health/status of the storage provider.
	 */
	abstract checkHealth(): Promise<unknown>;

	/**
	 * Creates a folder in the storage provider.
	 * @param folderName - The name of the folder to be created
	 */
	abstract createFolder(folderName: string): Promise<void>;

	/**
	 * Checks if a folder exists in the storage provider.
	 * @param folderName - The name of the folder to check
	 */
	abstract folderExists(folderName: string): Promise<boolean>;

	/**
	 * Deletes a folder from the storage provider.
	 * @param folderName - The name of the folder to be deleted
	 */
	abstract deleteFolder(folderName: string): Promise<void>;
}
