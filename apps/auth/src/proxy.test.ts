import { getRedirectUrl } from "next/experimental/testing/server";
import { NextRequest, NextResponse } from "next/server";
import { proxy } from "./proxy";

describe("Proxy", () => {
	it("should redirect to dashboard if user is authenticated", async () => {
		// Mock isAuthenticated to return true
		vi.mock("./proxy", async () => {
			const actual = await vi.importActual("./proxy");

			return {
				...actual,
				isAuthenticated: vi.fn().mockResolvedValue(true),
			};
		});

		const request = new NextRequest(process.env.NEXT_PUBLIC_AUTH_URL || "");
		const response = await proxy(request);

		expect(response?.status).toBe(302);
		expect(getRedirectUrl(new NextResponse(response))).toBe(
			process.env.NEXT_PUBLIC_DASHBOARD_URL,
		);
	});
});
