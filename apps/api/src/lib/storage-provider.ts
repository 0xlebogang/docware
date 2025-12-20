import * as Storage from "@repo/storage";

export const storage = Storage.createProvider(
	process.env.STORAGE_PROVIDER || "minio",
);
