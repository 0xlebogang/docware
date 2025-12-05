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
