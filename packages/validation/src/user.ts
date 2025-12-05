import { z } from "zod";

export const createUserSchema = z.object({
	email: z.email(),
	password: z.string().min(6, "Password must be at least 6 characters long"),
	fullName: z.string().min(1, "Full name is required"),
});

export const loginUserSchema = createUserSchema.pick({
	email: true,
	password: true,
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
