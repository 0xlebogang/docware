import { db as client, db } from "@repo/database";
import { createProvider } from "@repo/storage";
import { betterAuth, type User } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

const storage = createProvider(process.env.STORAGE_BACKEND || "gcs");

export async function createDefaultOrg(user: User) {
	const org = await db.organization.create({
		data: {
			name: `${user.name}'s Organization`,
			ownerId: user.id,
		},
	});

	const success = await storage.createBucket(`org-${org.id}`);
	if (!success) {
		throw new Error("Failed to create storage bucket for default organization");
	}

	await db.organization.update({
		where: { id: org.id, ownerId: user.id },
		data: {
			bucketId: `user-default-org-${org.id}`,
		},
	});
}

export const auth = betterAuth({
	appName: "auth",
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
	trustedOrigins: process.env.CORS_ALLOWED_ORIGINS?.split(",") || [],
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
	databaseHooks: {
		user: {
			create: {
				after: createDefaultOrg,
			},
		},
	},
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		minPasswordLength: 6,
	},
	plugins: [],
});
