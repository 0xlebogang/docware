import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: ["@repo/shadcn", "@repo/components"],
};

export default nextConfig;
