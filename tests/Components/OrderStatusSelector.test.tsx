import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

describe("OrderStatusSelector", () => {
  it("Should render New as the initial text", () => {
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn()} />
      </Theme>
    );

    const button = screen.getByRole("combobox");
    expect(button).toHaveTextContent(/new/i);
  });

  it("Should display other options when button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn()} />
      </Theme>
    );

    const button = screen.getByRole("combobox");
    await user.click(button);

    const options = await screen.findAllByRole("option");
    expect(options.length).toEqual(3);

    const labels = options.map((option) => option.textContent);
    expect(labels).toStrictEqual(["New", "Processed", "Fulfilled"]);
  });
});
