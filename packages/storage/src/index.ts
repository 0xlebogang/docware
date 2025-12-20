import { MinioStorageProvider } from "./providers/minio";

export function createProvider(storageType: string) {
	switch (storageType.toLowerCase()) {
		case "minio":
			return new MinioStorageProvider(
				process.env.MINIO_ENDPOINT || "localhost",
				process.env.MINIO_PORT || "9000",
				process.env.MINIO_ACCESS_KEY || "minioadmin",
				process.env.MINIO_SECRET_KEY || "minioadmin",
			);

		case "gcs":
			throw new Error("GCS storage provider is not implemented yet.");

		default:
			throw new Error(`Unsupported storage type: ${storageType}`);
	}
}
