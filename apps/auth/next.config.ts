import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: ["@repo/tailwindcss", "@repo/ui", "@repo/components"],
	reactCompiler: true,
};

export default nextConfig;
