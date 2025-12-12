import { factory } from "@repo/hono/factory";
import { authMiddleware } from "./middleware/auth";
import authRoute from "./routes/auth";
import orgRoutes from "./routes/orgs";

const app = factory.createApp();

app.route("", authRoute);

const api = app.use("*", authMiddleware).route("/orgs", orgRoutes);

export default api;
export type AppType = typeof api;
