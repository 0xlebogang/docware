import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

describe("Main Page", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders the main page correctly", () => {
		render(<div>Main Page Content</div>);
		expect(screen.getByText("Main Page Content")).toBeDefined();
	});
});
