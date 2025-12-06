import { checkAuthentication } from "@repo/better-auth/helpers";
import {
	getRedirectUrl,
	unstable_doesMiddlewareMatch,
} from "next/experimental/testing/server";
import { NextRequest, type NextResponse } from "next/server";
import { config, proxy } from "./proxy";

vi.mock("@repo/better-auth/helpers", () => ({
	checkAuthentication: vi.fn().mockResolvedValue(true),
}));

const protected_routes = ["/dashboard", "/profile", "/settings"];

describe("Proxy", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it.each(protected_routes)("should run proxy for %s", (route) => {
		const matchers = Array.isArray(config.matcher)
			? config.matcher
			: [config.matcher];
		expect(matchers).toContain(route);
	});

	describe.each(protected_routes)("Protected Routes", (route) => {
		it(`should run proxy for "${route}" route`, async () => {
			expect(
				unstable_doesMiddlewareMatch({
					config,
					url: route,
				}),
			).toBe(true);
		});

		it.skip(`should redirect user from ${route} to /sign-in when unauthenticated`, async () => {
			vi.mocked(checkAuthentication).mockResolvedValue(false);
			const request = new NextRequest(`http://localhost:3001${route}`);
			console.log(request.url);
			const response = await proxy(request);
			expect(getRedirectUrl(response as NextResponse<unknown>)).toBe(
				"http://localhost:3001/sign-in",
			);
		});
	});
});
