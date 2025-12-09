import { db as client } from "@repo/database";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
	appName: "@repo/auth",
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
	trustedOrigins: process.env.CORS_ALLOWED_ORIGINS?.split(",") || [
		"http://localhost:3000",
		"http://localhost:4321",
	],
	advanced: {
		defaultCookieAttributes: {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		},
		crossSubDomainCookies: {
			enabled: true,
			domain: process.env.COOKIE_DOMAIN || "localhost",
		},
	},
	database: prismaAdapter(client, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		minPasswordLength: 6,
	},
	plugins: [],
});
