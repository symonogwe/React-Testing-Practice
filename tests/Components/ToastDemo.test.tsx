import { render, screen } from "@testing-library/react";
import ToastDemo from "../../src/components/ToastDemo";
import userEvent from "@testing-library/user-event";
import { Toaster } from "react-hot-toast";

describe("ToastDemo component", () => {
  it("should render a toast", async () => {
    const user = userEvent.setup();

    render(
      <>
        <ToastDemo />
        <Toaster />
      </>
    );

    const button = screen.getByRole("button");
    await user.click(button);

    const toast = await screen.findByText(/success/i);
    expect(toast).toBeInTheDocument();
  });
});
