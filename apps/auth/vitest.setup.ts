/** biome-ignore-all lint/suspicious/noRedeclare: Allowed redeclaration for global augmentation */

import "@testing-library/jest-dom/vitest";
import { cleanup, render as rtlRender, screen } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
	cleanup();
});

// Attach testing library utilities to the global scope for easier access in tests
declare global {
	var render: typeof rtlRender;

	// Renamed to avoid conflict with other dom object
	var testScreen: typeof screen;
}

globalThis.render = rtlRender;
globalThis.testScreen = screen;

// Mock environment variables
process.env.NEXT_PUBLIC_AUTH_URL = "http://localhost:3000";
process.env.NEXT_PUBLIC_DASHBOARD_URL = "http://localhost:3001/dashboard";
process.env.NEXT_PUBLIC_SIGN_IN_URL = "http://localhost:3001/sign-in";
