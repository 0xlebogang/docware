import { UserInputSchema, z } from "@repo/database/validation";

export const SignUpSchema = UserInputSchema.pick({
	name: true,
	email: true,
})
	.extend({
		password: z.string().min(6, "Password must be at least 6 characters long"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
export type SignUpInput = z.infer<typeof SignUpSchema>;
