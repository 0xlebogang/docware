import { uiConfig } from "@repo/vitest-config";
import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
	uiConfig,
	defineConfig({
		test: {
			name: "main",
			setupFiles: ["./vitest.setup.ts"],
		},
	}),
);
