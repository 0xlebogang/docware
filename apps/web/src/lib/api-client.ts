import type { ApiType } from "api/rpc";
import { hc } from "hono/client";

export const api = hc<ApiType>(process.env.NEXT_PUBLIC_API_URL as string);
