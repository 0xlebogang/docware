/**
 * BaseStorageProvider serves as an abstract class for different storage providers.
 */
export abstract class BaseStorageProvider {
	/**
	 * Checks the health/status of the storage provider.
	 */
	abstract checkHealth(): Promise<unknown>;

	/**
	 * Creates a storage bucket in the storage provider.
	 * @param bucketName - The name of a storage bucket to create
	 */
	abstract createBucket(bucketName: string): Promise<unknown>;

	/**
	 * Checks if a storage bucket exists in the storage provider.
	 * @param bucketName - The name of a storage to check for existance
	 */
	abstract bucketExists(bucketName: string): Promise<boolean>;

	/**
	 * Deletes a storage bucket from the storage provider.
	 * @param bucketName - The name of a storage bucket to be deleted
	 */
	abstract deleteBucket(bucketName: string): Promise<boolean>;

	/**
	 * Creates a folder in the storage provider.
	 * @param folderName - The name of the folder to be created
	 */
	abstract createFolder(folderName: string): Promise<boolean>;

	/**
	 * Checks if a folder exists in the storage provider.
	 * @param folderName - The name of the folder to check
	 */
	abstract folderExists(folderName: string): Promise<boolean>;

	/**
	 * Deletes a folder from the storage provider.
	 * @param folderName - The name of the folder to be deleted
	 */
	abstract deleteFolder(folderName: string): Promise<boolean>;
}
