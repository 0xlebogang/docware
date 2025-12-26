export const ORGANIZAION_API_HEADER =
	process.env.ORGANIZATION_ID_HEADER || "X-Organization-ID";
if (!ORGANIZAION_API_HEADER) {
	throw new Error("ORGANIZATION_ID_HEADER is not defined in environment.");
}
