import type { z } from "zod";
import type * as schema from "./schemas";

// User Types
export type UserInput = z.infer<typeof schema.UserInputSchema>;
export type User = z.infer<typeof schema.UserModelSchema>;

// Organization Types
export type OrganizationInput = z.infer<typeof schema.OrganizationInputSchema>;
export type Organization = z.infer<typeof schema.OrganizationModelSchema>;
