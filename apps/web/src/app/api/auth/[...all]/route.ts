import { auth, toNextJsHandler } from "@repo/better-auth/server";

export const { POST, GET } = toNextJsHandler(auth);
