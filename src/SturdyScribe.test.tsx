import { render, screen } from "@testing-library/react";
import SturdyScribe from "./SturdyScribe";

test("renders learn react link", () => {
  render(<SturdyScribe />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
