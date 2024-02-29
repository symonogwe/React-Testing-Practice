import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("TermsAndConditions", () => {
  const renderComponent = () => {
    render(<TermsAndConditions />);

    return {
      heading: screen.getByRole("heading"),
      checkBox: screen.getByRole("checkbox"),
      button: screen.getByRole("button"),
    };
  };
  it("Should render correct text and initial state", () => {
    const { heading, checkBox, button } = renderComponent();

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Terms & Conditions");

    expect(checkBox).toBeInTheDocument();

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("Should enable the button when the checkbox is clicked", async () => {
    const user = userEvent.setup();

    const { checkBox } = renderComponent();
    await user.click(checkBox);

    const button = screen.getByRole("button");
    expect(button).toBeEnabled();
  });
});
