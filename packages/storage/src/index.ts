import { GCSStorageProvider } from "./providers/gcs";
import { MinioStorageProvider } from "./providers/minio";

// Re-export Google Cloud Storage types and classes
export * from "@google-cloud/storage";

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
			if (process.env.NODE_ENV === "production") {
				return new GCSStorageProvider({
					projectId: process.env.GCS_PROJECT_ID,
				});
			} else {
				return new GCSStorageProvider({
					projectId: process.env.GCS_PROJECT_ID || "local-gcs-project",
					apiEndpoint: process.env.GCS_API_ENDPOINT || "http://localhost:4443",
				});
			}

		default:
			throw new Error(`Unsupported storage type: ${storageType}`);
	}
}
