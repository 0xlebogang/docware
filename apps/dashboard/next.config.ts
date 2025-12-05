import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: [
		"@repo/shadcn",
		"@repo/components",
		"@repo/database",
		"@repo/better-auth",
	],
	allowedDevOrigins: ["http://localhost:3001"],
};

export default nextConfig;
