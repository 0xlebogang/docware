import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: [
		"@repo/tailwindcss",
		"@repo/ui",
		"@repo/components",
		"@repo/database",
		"@repo/storage",
	],
	reactCompiler: true,
};

export default nextConfig;
