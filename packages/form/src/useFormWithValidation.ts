import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType, z } from "@repo/validation";
import { type Resolver, useForm } from "react-hook-form";

type FormData = z.infer<typeof ZodType>;

export function useFormWithValidation<T extends ZodType<unknown, unknown>>(
	schema: T,
	onSubmit: (data: z.infer<T>) => void | Promise<void>,
) {
	return useForm<FormData>({
		resolver: zodResolver(schema) as Resolver<FormData>,
		mode: "onBlur",
	});
}
