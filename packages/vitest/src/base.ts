import { defineConfig } from "vitest/config";

export const baseConfig = defineConfig({
	test: {
		coverage: {
			enabled: true,
			provider: "v8",
			reporter: ["text", "lcov", "json", "json-summary"],
		},
	},
});
