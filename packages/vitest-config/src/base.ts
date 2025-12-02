import { defineConfig } from "vitest/config";

export const baseConfig = defineConfig({
	test: {
		globals: true,
		coverage: {
			enabled: true,
			provider: "v8",
			reporter: ["text", "lcov", "json", "json-summary"],
		},
	},
});
