import Index from "./page";

describe("Index page", () => {
	it("renders properly", () => {
		render(<Index />);

		const buttonElement = testScreen.getByText("Button");
		expect(buttonElement).toBeInTheDocument();
	});
});
