import { render, screen } from "@testing-library/react";

import SturdyScribe from "./SturdyScribe";

it("should render the title without crashing", () => {
  render(<SturdyScribe />);
  const title = screen.getByText("SturdyScribe (early preview)");
  expect(title).toBeInTheDocument();
});
