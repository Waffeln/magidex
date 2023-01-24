import React from "react";
import Home from "./Home";
import {render} from "@testing-library/react";

// filler-test
describe("Initial test", () => {
	test("Shows if welcome message is rendered.", () => {
		const wrapped = render(<Home />);
		expect(wrapped.getAllByText("Welcome to MagiDex,"));
	});
});