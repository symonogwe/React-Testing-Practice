import Greet from "../../src/components/Greet";
import { render, screen } from "@testing-library/react";

describe("Greet", () => {
  it("Should render heading when the name is not provided", () => {
    render(<Greet name="Symon" />);
    const heading = screen.getByRole("heading", { name: /symon/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/symon/i);
  });

  it("should render login button when the name is not provided", () => {
    render(<Greet />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
    screen.debug();
  });
});
