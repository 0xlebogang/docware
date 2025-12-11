import { factory } from "@repo/hono/factory";
import authRoute from "./routes/auth";
import orgRoutes from "./routes/orgs";

const app = factory.createApp();

app.route("", authRoute);

const api = app.route("/v1", orgRoutes);

export default api;
export type AppType = typeof api;
