import { z } from "zod";

export const createUserSchema = z.object({
	isLoading: z.boolean(),
	fullName: z
		.string()
		.nonempty("Full name is required")
		.min(3, "Full name must be at least 3 characters"),
	email: z.email({ error: "Invalid email address" }),
	password: z.string().min(6, "Password must be at least 6 characters"),
	confirmPassword: z
		.string()
		.min(6, "Confirm password must be at least 6 characters"),
});

export const signInUserSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string().nonempty("Password is required"),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type SignInUserInput = z.infer<typeof signInUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
