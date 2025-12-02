import { mergeConfig, defineConfig } from "vitest/config";
import { uiConfig } from "@repo/vitest-config";

export default mergeConfig(
	uiConfig,
	defineConfig({
		test: {
			name: "main",
			setupFiles: ["./vitest.setup.ts"],
		},
	}),
);
