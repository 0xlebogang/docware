import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			enabled: true,
			provider: "v8",
			reporter: ["text", "html", "lcov", "json", "json-summary"],
		},
		projects: ["apps/*", "packages/*", "!packages/ui"],
	},
});
